//import always on top
import c3 from "c3";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

//window.functionName > used to trigger the code in Filemaker.
//function(parameter) > parameter is send via FileMaker as a JSON element
window.loadChart = function(json){

//this is just to see the result when inspecting the webviewer in FileMaker
//  console.log(json);
  const obj = JSON.parse(json);
//  console.log(obj);

//here we get the data from the parameters passed via FileMaker
  const type = obj.type;
  const columns = obj.data;
  const isRotated = obj.isRotated;
  const isShowLabels = obj.isShowLabels;
  const pieLabels = obj.pieLabels;
  const width = obj.width;
  const height = obj.height;

  var chart = c3.generate({
    grid: {
  x: {
    show: true
  }
},
  size: {
    width: width,
    height: height
  },
  zoom: {
  enabled: true
},
  bindto: '#chart',
  axis: {
  x: {
    type: "category",
    },
    rotated: isRotated
  },
  data: {
    onclick: function (clickedData) {
      console.log(clickedData);
      const {id, index, value} = clickedData;
      const month = months[index];
      const object = {id, month, value};
      //Code below could replace the 4 lines above
      //const obj = { id: clickedData.id, month: months[clickedData.index] };
      console.log(id, index, month);
      console.log(object);
      //pass the parameter as JSON.stringify(param)
      FileMaker.PerformScript("Get Data", JSON.stringify(object));
    },
      x: "x",
      type: type,
      columns: columns,
      labels: isShowLabels,
      colors: {
                Bananas: 'orange',
                Kiwi: 'green',
                Blackberries: 'blue'
            }
},
legend: {
  position: 'inset',
  inset: {
    anchor: 'top-right',
    x: 20,
    y: 10,
    step: 3
  }
},
    
//bar modifications    
bar: {
  width: {
    ratio: 0.8
  }  
},
//pie modifications    
pie: {
  label: {
    show: pieLabels
  }
},
  });
};


