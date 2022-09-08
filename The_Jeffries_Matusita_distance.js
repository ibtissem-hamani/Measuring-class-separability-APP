function jmsep(classe1,classe2,image,table){

  var tab1=table.filter(ee.Filter.eq('Class',classe1));
  //print('tab1',tab1);

  //m1==> la moyenne de la 1ere class
  var m1 = image.reduceRegion({reducer: ee.Reducer.mean(),geometry: tab1.geometry()});
  //print('mean 1',m1);

  //s1==> la covariance de la 1ere class
  var s1 = image.toArray().reduceRegion({reducer: ee.Reducer.covariance(),geometry: tab1.geometry()});
  //print('cover 1',s1);

  var tab2=table.filter(ee.Filter.eq('Class',classe2));
  //print('tab2',tab2);

  //m2==> la moyenne de la 2eme class
  var m2 = image.reduceRegion({reducer: ee.Reducer.mean(),geometry: tab2.geometry()});
  //print('mean 2',m2);

  //s2==> la covariance de la 2eme class
  var s2 = image.toArray().reduceRegion({reducer: ee.Reducer.covariance(),geometry: tab2.geometry()});
  //print('conver 2',s2);

  //m12 = (m1-m2)
  var m12 = m1.toArray().subtract(m2.toArray());

  // m12 en 1D ==> (avec la fonction .cat()) m12 en 2D.
  m12 = ee.Array.cat([m12], 1);
  //print('m12',m12);

  //m122 ==> (m1-m2)t (la transposer de m12).
  var m122 = m12.transpose();
  //print('m12',m12);

  s1=s1.toArray();
  s2=s2.toArray();

  //s12i ==> ((s1+s2)/2)^(-1)
  var s12i=(s1.add(s2)).divide(2).matrixInverse();
  //print('s12',s12i);

  //b1 ==> 1/8*(m122*s12i).
  //b1 ==> 1/8*[(m1-m2)t]*[((s1+s2)/2)^(-1)].
  var b1=(m122.matrixMultiply(s12i)).divide(8);
  //print('b1',b1);

  //b1 ==> b1*m12.
  //b1 ==> 1/8*[(m1-m2)t]*[((s1+s2)/2)^(-1)]*(m1-m2)t.
  b1= b1.matrixMultiply(m12);
  //print('b1',b1);

  //ds1 ==> |s1|.
  var ds1=s1.matrixDeterminant();
  //print('ds1',ds1);

  //ds2 ==> |s2|.
  var ds2=s2.matrixDeterminant();
  //print('ds2',ds2);

  //ds12 ==> |(s1+s2)/2|.
  var ds12=(s1.add(s2).divide(2)).matrixDeterminant();
  //print('ds12',ds12);

  //b22 ==> ds1^(1/2)*ds2^(1/2).
  //b22 ==> [|s1|^(1/2)]*[|s2|^(1/2)].
  var b22 = (ds1.sqrt()).multiply(ds2.sqrt());
  //print('b22',b22);

  //b2 ==> (1/2)*ln(ds12/b22).
  //b2 ==> (1/2)*ln [|(s1+s2)/2|/[|s1|^(1/2)]*[|s2|^(1/2)]].
  var b2=(ds12.divide(b22)).log().divide(2);
  //print('b2',b2);

  //b ==> b1+b2.
  //.project([0]) ==> b en 1D.
  // b ==> 1/8*[(m1-m2)t]*[((s1+s2)/2)^(-1)]+(1/2)*ln [|(s1+s2)/2|/[|s1|^(1/2)]*[|s2|^(1/2)]].
  var b=ee.Number(ee.List((b1.add(b2)).project([1]).toList()).get(0));

  //print('b',b);
  // return ==> 2*[1-(1/Exp(b))].
  return (ee.Number(1).subtract(ee.Number(1).divide(b.exp()))
  .multiply(2));
}
