
//2018-05-17 xycx

$(function(){
    //add
    var aicode = $(".detail_addImg").html();
    var aidom = '<div class="detail_addImg">'+aicode+'</div>';
    var atcode = $(".writen_detail").html();
    var atdom = '<div class="writen_detail">'+atcode+'</div>';
    var ainum = 0, atnum = 0;
    $(".xyadd-image").click(function(){
        if(ainum < 20){
            $(".xyItems").append(aidom);
            ainum += 1;
        }else{
            alert("图片添加已达到限定值！");
        }
    });
    $(".xyadd-text").click(function(){
        if(atnum < 20){
            $(".xyItems").append(atdom);
            atnum += 1;
        }else{
            alert("文字添加已达到限定值！");
        }
    });
    //del
    $(".xyItems").on("click", ".delete-image", function(){
        $(this).parent().remove();
        ainum -= 1;
    });
    $(".xyItems").on("click", ".delete-text", function(){
        $(this).parent().remove();
        atnum -= 1;
    });
    $(".xyItems").mouseenter(function(){
        
    });
    //rank-up
    $(".xyItems").on("click", ".xyrank .up", function(){
        var self = $(this).parent().parent();
        self.insertBefore(self.prev());
        self.animate({opacity:0.1},200).animate({opacity:1},200).animate({opacity:0.1},200).animate({opacity:1},200);
    });
    //rank-down
    $(".xyItems").on("click", ".xyrank .dw", function(){
        var self = $(this).parent().parent();
        self.insertAfter(self.next());
        self.animate({opacity:0.1},200).animate({opacity:1},200).animate({opacity:0.1},200).animate({opacity:1},200);
    });
});


 //点击
 var clickImg = function(obj) {
         $(obj).parent().find('.upload_input').click();
     }
     //删除
 var deleteImg = function(obj) {
         $(obj).parent().find('input').val('');
         $(obj).parent().find('img.preview').attr("src", "");
         //IE9以下
         $(obj).parent().find('img.preview').css("filter", "");
         $(obj).hide();
         $(obj).parent().find('.addImg').show();
     }
     //选择图片
 function change(file) {
     //预览
     var pic = $(file).parent().find(".preview");
     //添加按钮
     var addImg = $(file).parent().find(".addImg");
     //删除按钮
     var deleteImg = $(file).parent().find(".delete");

     var ext = file.value.substring(file.value.lastIndexOf(".") + 1).toLowerCase();

     // gif在IE浏览器暂时无法显示
     if (ext != 'png' && ext != 'jpg' && ext != 'jpeg') {
         if (ext != '') {
             alert("图片的格式必须为png或者jpg或者jpeg格式！");
         }
         return;
     }
     //判断IE版本
     var isIE = navigator.userAgent.match(/MSIE/) != null,
         isIE6 = navigator.userAgent.match(/MSIE 6.0/) != null;
     isIE10 = navigator.userAgent.match(/MSIE 10.0/) != null;
     if (isIE && !isIE10) {
         file.select();
         var reallocalpath = document.selection.createRange().text;
         // IE6浏览器设置img的src为本地路径可以直接显示图片
         if (isIE6) {
             pic.attr("src", reallocalpath);
         } else {
             // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现             
             pic.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")");
             // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
             pic.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
         }
         addImg.hide();
         deleteImg.show();
     } else {
         html5Reader(file, pic, addImg, deleteImg);
     }
 }
 //H5渲染
 function html5Reader(file, pic, addImg, deleteImg) {
     var file = file.files[0];
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function(e) {
         pic.attr("src", this.result);
     }
     addImg.hide();
     deleteImg.show();
 }
 //  商品规格点击添加
 $("#items_sizeBtn").click(function() {
     var bigDiv = $('.items_addBorder');
     var addtr = $(
         "<div class='item_sizePart'>" +
         "<div class='items_size' id='items_sizeShow'>" +
         "<table class='items_addTab'>" +
         "<tr>" +
         "<td><input type='text' name='name' /></td>" +
         "<td class='items_sizetable_td'><input type='text' name='name' /></td>" +
         "<td><input type='text' name='name' /></td>" +
         "</tr>" +
         "</table>" +
         "<input class='item_size_Btn' type='button' value='保存'id='items_sizeBtn2'>" +
         "<input class='item_size_Btn' type='button'value='删除' id='items_sizeBtn3'  onclick=' deleteRow($(this));'/>" +
         "</div>" +
         "<div class='item itm_addimgs'>" +
         "<img class='icon addImg' onclick='clickImg(this);' src='img/addImg.png'/>" +
         "<input name='url' type='file'class='upload_input' onchange='change(this)' />" +
         "<div class='preBlock'>" +
         "<img class='preview' alt='' name='pic' width='140' height='140'/>" +
         "</div>" +
         "<img class='delete' onclick='deleteImg(this)' src='img/delete.png' />" +
         "</div>" +
         "</div>"
     );
     $(bigDiv).append(addtr);
 });

 //删除
 function deleteRow(obj) {
     obj.parents(".item_sizePart").remove();
 }
 //  function sys_remove_element(obj, pclass, isone) {
 //      var one = false;
 //      if ('' != isone && undefined != isone && (true === isone || 'true' == isone)) {
 //          one = true;
 //      }
 //      var p = obj.parents('.item_sizePart' + pclass);
 //      if (one) {
 //          if (p.prev('.' + pclass).length == 0 && p.next('.' + pclass).length == 0) {
 //              alert('至少保留一条');
 //              return false;
 //          } else {
 //              p.remove();
 //          }
 //      } else {
 //          p.remove();
 //      }
 //      return true;
 //  }

 //  添加商品详情
 //  $("#detail_as_btn").click(function() {
 //      var big_detailDiv = $('.items_UpperShelf_addBigImg');
 //      var addDet_ipt = $(
 //          "<div class='items_UpperShelf_addBigImg'>" +
 //          "<div class='detail_addImg'>" +
 //          "<img class='icon addImg' onclick='clickImg(this);'' src='img/addImg.png' />" +
 //          "<input name='url' type='file' class='upload_input' onchange='change(this)'/>" +
 //          "<div class='preBlock'>" +
 //          "<img class='preview' alt='' name='pic' width='520' height='220' />" +
 //          "<td><input type='text' name='name' /></td>" +
 //          "</div>" +
 //          "<div class='detail_delImg delete' onclick='deleteImg(this)'>" +
 //          "<p>删除</p>" +
 //          "</div>" +
 //          "</div>"
 //      );
 //      $(big_detailDiv).append(addDet_ipt);
 //  });