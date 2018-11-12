var xhr = new XMLHttpRequest();
xhr.open('get','https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery',true);
xhr.onload = function(){
  var data = JSON.parse(xhr.responseText);
  var area = document.getElementById('area');
  var type = document.getElementById('type');
  var btn = document.getElementById('btn');
  var total = document.querySelector('.total');
  var list = document.querySelector('.list');
  var areaTotal = {};
  var typeTotal = {};
  var option;
  var li;
  var count;
  var str = '';

  option = document.createElement('option');
  option.value = '所有地區';
  option.text = '所有地區';
  area.add(option);

  option = document.createElement('option');
  option.value = '所有災害類型';
  option.text = '所有災害類型';
  type.add(option);

  for(var i = 0; i < data.length; i++){
      var areaContent = data[i].ZipName_;
      var typeContent = data[i].InformDesc_;

      if(areaTotal[areaContent] == undefined){
          areaTotal[areaContent] = 1;
          option = document.createElement('option');
          option.value = data[i].ZipName_;
          option.text = data[i].ZipName_;
          area.add(option);
      }else{
          areaTotal[areaContent] += 1;
      }

      if(typeTotal[typeContent] == undefined){
          typeTotal[typeContent] = 1;
          option = document.createElement('option');
          option.value = data[i].InformDesc_;
          option.text = data[i].InformDesc_;
          type.add(option);
      }else{
          typeTotal[typeContent] += 1;
      }
  }

  // for(var i = 0; i < data.length; i++){
  //   li = document.createElement('li');
  //   list.appendChild(li);
  //   li.innerHTML = '<h4>地點：' + data[i].address_ + '</h4><h5>報案狀況：' + data[i].BeforeDesc_ + '</h5>';
  // }

  btn.addEventListener('click', function(){

    var count = 0;    
    list.innerHTML = ''; // 清除 ul 裡的所有 li 

    for(var i = 0; i < data.length; i++){

        if(data[i].ZipName_ == area.value && data[i].InformDesc_ == type.value){
          li = document.createElement('li');
          list.appendChild(li);
          li.innerHTML = '<h4>地點：' + data[i].address_ + '</h4><h5>報案狀況：' + data[i].BeforeDesc_ + '</h5>';
          count += 1;                          
        }else if(area.value == '所有地區' && data[i].InformDesc_ == type.value){
          li = document.createElement('li');
          list.appendChild(li);
          li.innerHTML = '<h4>地點：' + data[i].address_ + '</h4><h5>報案狀況：' + data[i].BeforeDesc_ + '</h5>';
          count += 1;
        }else if(data[i].ZipName_ == area.value && type.value == '所有災害類型'){
          li = document.createElement('li');
          list.appendChild(li);
          li.innerHTML = '<h4>地點：' + data[i].address_ + '</h4><h5>報案狀況：' + data[i].BeforeDesc_ + '</h5>';
          count += 1;
        }else if(area.value == '所有地區' && type.value == '所有災害類型'){
          li = document.createElement('li');
          list.appendChild(li);
          li.innerHTML = '<h4>地點：' + data[i].address_ + '</h4><h5>報案狀況：' + data[i].BeforeDesc_ + '</h5>';
          count += 1;
        }
    }
    
    total.innerHTML =  '<span>' + area.value + '</span> <span>' + type.value + '</span> 有 <em>' + count + '</em> 處';

    if(list.innerHTML == ''){
      list.innerHTML = '<h4>目前沒有資料</h4>'
    }
  })
  
}
xhr.send();