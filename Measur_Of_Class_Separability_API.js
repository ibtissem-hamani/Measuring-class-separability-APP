// Initialisation of position & classes
var possition=[-0.6263393260559269, 35.69585752473928],
classes_App=[mer,sebkha,urbain,vegetation];

// API code
var app={},
bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
COLLECTION_ID = 'LANDSAT/LC08/C01/T1_TOA',
image=null;
app.creePanels = function(){
  app.intro = {
    panel: ui.Panel({
      widgets:[
        ui.Label({
          value: ' Measuring class separability',
          style: {fontWeight: 'bold', fontSize: '26px',backgroundColor:'#02031E',color:'#EDC605'}
        }),
        ui.Label({
          value: 'This APP is necessary to evaluate the quality of the class representative samples and determine the classes with ambiguous boundaries in feature space, where poor classification accuracy is expected',
          style: app.TEXT_BLUE
        })
      ],
      style: app.SECTION_STYLE
    })
  };
 
app.filters = {
    startDate: ui.Textbox('YYYY-MM-DD', '2018-01-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2018-12-31'),
    applyButton: ui.Button({
      label: 'Image loading',
      onClick: function() {
        app.applyFilters();
      },
      style: {width: '200px'}
    }),
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        var option = app.VIS_OPTIONS[app.filters.select.getValue()];
        app.filters.label.setValue(option.description);
      },
      style:{width: '200px'}
    }),
    label: ui.Label({
      style:app.HELPER_TEXT_STYLE
    }),
    labelerreur: ui.Label({
      style:{fontSize: '13px',color: 'red', shown: true,backgroundColor:'#02031E'}
    }),
    loadingLabel: ui.Label({
      style: {stretch: 'vertical', fontSize: '16px',color: '#929BFC', shown: false,backgroundColor:'#02031E'}
    })
  };
  
app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Date selection ', {fontWeight: 'bold', fontSize: '18px',backgroundColor:'#02031E',color:'#EDC605'}),
      ui.Panel({
        widgets:[
          ui.Panel({
            widgets:[
              ui.Label('Start date', app.HELPER_TEXT_STYLE),
              app.filters.startDate
            ],
            style:{backgroundColor:'#02031E',color:'#02031E'}
          }),
          ui.Panel({
            widgets:[
              ui.Label('End date', app.HELPER_TEXT_STYLE),
              app.filters.endDate
            ],
            style:{margin:'0px 0px 0px 30px',backgroundColor:'#02031E',color:'#02031E'}
          }),
          ],
        layout: ui.Panel.Layout.flow('horizontal'),
        style:{backgroundColor:'#02031E',color:'#02031E'}
      }),
      ui.Panel({
        widgets: [
          ui.Label('2) Visualization selection', {fontWeight: 'bold', fontSize: '18px',backgroundColor:'#02031E',color:'#EDC605'}),
          app.filters.select.setPlaceholder('Choisissez ...'),
          app.filters.label
        ],
        style: app.SECTION_STYLE
      }),
        ui.Panel({
        widgets:[
        app.filters.applyButton,
        app.filters.loadingLabel
      ],
      layout: ui.Panel.Layout.flow('horizontal'),
      style:app.SECTION_STYLE
      }),
      ui.Panel({
        widgets:[
        app.filters.labelerreur
      ],
      style:app.SECTION_STYLE
      })
    ],
    style: app.SECTION_STYLE
  });
  
   
app.separability = {
    separButton: ui.Button({
      label: 'Calculate',
      onClick: function() {
        app.applySepar();
      },
      style: {width: '200px'}
    }),
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        var option = app.VIS_OPTIONS[app.separability.select.getValue()];
        app.separability.label.setValue(option.description);
      },
      style:{width: '200px'}
    }),
    label: ui.Label({
      style:app.HELPER_TEXT_STYLE
    }),
    labelerreur: ui.Label({
      style:{fontSize: '13px',color: 'red', shown: true,backgroundColor:'#02031E'}
    }),
    loadingLabel: ui.Label({
      style: {stretch: 'vertical', fontSize: '16px',color: '#929BFC', shown: false,backgroundColor:'#02031E'}
    })
  };
  
  app.separability.panel = ui.Panel({
    widgets: [
      ui.Panel({
        widgets: [
          ui.Label('3) Calculate the separability of classes', {fontWeight: 'bold', fontSize: '18px',backgroundColor:'#02031E',color:'#EDC605'}),
          app.separability.label
        ],
        style: app.SECTION_STYLE
      }),
        ui.Panel({
        widgets:[
        app.separability.separButton,
        app.separability.loadingLabel
      ],
      layout: ui.Panel.Layout.flow('horizontal'),
      style:app.SECTION_STYLE
      }),
      ui.Panel({
        widgets:[
        app.separability.labelerreur
      ],
      style:app.SECTION_STYLE
      })
    ],
    style: app.SECTION_STYLE
  });
  

};

app.creeConstantes = function(){
  app.IMAGE_COUNT_LIMIT = 10;

  app.SECTION_STYLE = {
    margin: '5px 0 0 0',
    fontSize: '16px',
    backgroundColor:'#02031E'
  };
  app.HELPER_TEXT_STYLE = {
      margin: '5px 0 -3px 8px',
      fontSize: '13px',
      backgroundColor:'#02031E',
      color: 'gray'
  };
  app.style_elem ={
    margin: '0 3px 0 0',
    textAlign:'center',
    height:'40px',
    width:'80px',
    fontSize: '14px',
    color: '#02031E',
    backgroundColor:'#929BFC'
  };
  app.style_elem_borders = {
    margin: '0 3px 0 0',
    textAlign:'center',
    height:'40px',
    width:'80px',
    fontSize: '14px',
    color: 'gray',
    backgroundColor:'#02031E'
  };
  app.TEXT_BLUE = {
      fontSize: '16px',
      backgroundColor:'#02031E',
      textAlign:'center',
      color: '#929BFC'
  };
  app.VIS_OPTIONS = {
    'False colors (B5/B4/B3)': {
      name:'False colors',
      description: 'The vegetation appears in different shades of red, the urban in light blue and the ground is in brown.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B5', 'B4', 'B3']}
    },
    'True colors (B4/B3/B2)': {
      name:'True colors',
      description: 'Ground features appear in colors similar to those of the human visual system.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    }
  };
};

app.setLoadingMode = function(enabled) {
  app.filters.loadingLabel.style().set('shown', enabled);
  var loadDependentWidgets = [
    app.filters.startDate,
    app.filters.endDate,
    app.filters.select,
    app.filters.applyButton
  ];
  loadDependentWidgets.forEach(function(widget) {
    widget.setDisabled(enabled);
  });
};

app.applyFilters = function() {
  Map.clear();
  Map.setCenter(possition[0], possition[1], 9);
  app.setLoadingMode(true);
  var filtered = ee.ImageCollection(COLLECTION_ID);
      filtered = filtered.filterBounds(Map.getCenter());
  var start = app.filters.startDate.getValue();
  if (start) start = ee.Date(start);
  var end = app.filters.endDate.getValue();
  if (end) end = ee.Date(end);
  if (start) filtered = filtered.filterDate(start, end);
  image = filtered
        .sort('CLOUD_COVER')
        .first()
        .select(bands);
    Map.clear();
    if(app.filters.select.getValue()){
      app.filters.loadingLabel.setValue('loading...');
      app.filters.labelerreur.setValue('');
      var visOption = app.VIS_OPTIONS[app.filters.select.getValue()];
      Map.addLayer(image, visOption.visParams,visOption.name);
      image.evaluate(function(ids) {
        app.setLoadingMode(false);
        app.filters.loadingLabel.setValue('');
      });
    }
    else{
        app.setLoadingMode(true);
        image=null;
        app.filters.labelerreur.setValue('Please select a viewer.');
        app.setLoadingMode(false);
    }
};

app.applySepar = function() {
  var polygonsT = ee.FeatureCollection(classes_App);
  var nom=[];
   for (var i = 0; i < classes_App.length; i++) {
            var c =classes_App[i].get("name");
            var nam = c.getInfo();
            nom.push(nam);
          }
  
  var toolPanel = ui.Panel({widgets: [],style: {position: 'top-right',padding:'5px',minHeight: '160px',width: '140px'}});

  toolPanel.add(ui.Label('les classes', {margin: '4px',fontSize:'18px'}));

        var elem,lign,all;
        all = ui.Panel({
            widgets:[
            ],
            layout: ui.Panel.Layout.flow('vertical'),
            style:{margin:'0 0 0 8px',backgroundColor:'#02031E'}
          }); 
        lign = ui.Panel({
            widgets:[
              ui.Label({
                value: '',
                style: app.style_elem_borders
              })
            ],
            layout: ui.Panel.Layout.flow('horizontal'),
            style:{backgroundColor:'#02031E',margin: '0 0 3px 0'}
          });
  
  
  
  var ci=[];
  for(var i=0;i<4;i++)
  {
    var cj=[];
    for(var j=0;j<4;j++)
    {
      if(i==j)
      {
        cj.push(0);
      }
      else
      {
            cj.push(jmsep(i,j,image,polygonsT).getInfo());
      }
    }
    ci.push(cj);
  }
  
  
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
          
        for(var k=0;k<classes_App.length;k++){
          lign.add(ui.Label({
            value: nom[k],
            style: app.style_elem_borders
          }));
        }
        all.add(lign) ;
        for(i=0;i<classes_App.length;i++)
        {
          lign = ui.Panel({
              widgets:[
                ],
                layout: ui.Panel.Layout.flow('horizontal'),
                style:{backgroundColor:'#02031E',margin: '0 0 3px 0'}
          });
          for(var j=0;j<classes_App.length;j++)
          {
            if(j===0){
              lign.add(ui.Label({
                value: nom[i],
                style: app.style_elem_borders
              }));
            }
            elem = ui.Label({
              value: '',
              style: app.style_elem
            });
            if(ci[i][j] == '0'){
              elem.setValue(ci[i][j]);
            }
            else if(ci[i][j] == '2'){
              elem.setValue(ci[i][j]);
            }
            else if(ci[i][j].toFixed(5) == '2.00000'){
              elem.setValue('2');
            }
            else{
              elem.setValue(ci[i][j].toFixed(5));

            }
            lign.add(elem);
          }
          all.add(lign);
        }
        var table = ui.Panel({
            widgets:[
              all
              ],
              layout: ui.Panel.Layout.flow('horizontal'),
              style:{backgroundColor:'#02031E'}
        });
        app.separability.panel.add(ui.Label('4) Result of class separability', {fontWeight: 'bold', fontSize: '18px',textAlign:'center',backgroundColor:'#02031E',color:'#EDC605'}));
        app.separability.panel.add(table);
        app.separability.panel.add(ui.Label('This index takes a value between 0 and 2. A separability index greater than 1.90 indicates good class separability while a value less than 1.0 shows poor separability.', app.HELPER_TEXT_STYLE));

};

app.boot = function() {
  app.creeConstantes();
  app.creePanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.separability.panel
    ],
    style: {width: '500px', padding: '15px',color: '#02031E',backgroundColor:'#02031E'}
  });
  Map.setCenter(possition[0], possition[1], 9);
  ui.root.insert(0, main);
};

app.boot();
