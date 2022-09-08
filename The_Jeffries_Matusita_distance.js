function jmsep(classe1,classe2,image,table){

  var tab1=table.filter(ee.Filter.eq('Class',classe1));

  var m1 = image.reduceRegion({reducer: ee.Reducer.mean(),geometry: tab1.geometry()});

  var s1 = image.toArray().reduceRegion({reducer: ee.Reducer.covariance(),geometry: tab1.geometry()});

  var tab2=table.filter(ee.Filter.eq('Class',classe2));

  var m2 = image.reduceRegion({reducer: ee.Reducer.mean(),geometry: tab2.geometry()});

  var s2 = image.toArray().reduceRegion({reducer: ee.Reducer.covariance(),geometry: tab2.geometry()});

  var m12 = m1.toArray().subtract(m2.toArray());

  m12 = ee.Array.cat([m12], 1);

  var m122 = m12.transpose();

  s1=s1.toArray();
  s2=s2.toArray();

  var s12i=(s1.add(s2)).divide(2).matrixInverse();

  var b1=(m122.matrixMultiply(s12i)).divide(8);

  b1= b1.matrixMultiply(m12);

  var ds1=s1.matrixDeterminant();

  var ds2=s2.matrixDeterminant();

  var ds12=(s1.add(s2).divide(2)).matrixDeterminant();

  var b22 = (ds1.sqrt()).multiply(ds2.sqrt());

  var b2=(ds12.divide(b22)).log().divide(2);

  var b=ee.Number(ee.List((b1.add(b2)).project([1]).toList()).get(0));

  return (ee.Number(1).subtract(ee.Number(1).divide(b.exp()))
  .multiply(2));
}
