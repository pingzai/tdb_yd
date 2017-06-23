/**
 * Created by KQ on 2016/12/29.
 */
$(function(){
    //点击图片触发file事件
    $(".pic").click(function(){
        document.getElementById("filePic").click();
    });
    $("#showImg").click(function () {
        document.getElementById("fileOne").click();
    });
    $("#showImgOne").click(function () {
        var src=$(this).find("img").attr("src");
        if(src==undefined) {
            document.getElementById("fileOnes").click();
        }else{
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请先删除再进行添加");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return;
        }
    });
    $("#showImgTwo").click(function () {
        var src=$(this).find("img").attr("src");
        if(src==undefined) {
            document.getElementById("fileTwo").click();
        }else{
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请先删除再进行添加");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return;
        }
    });
    $("#showImgThree").click(function () {
        var src=$(this).find("img").attr("src");
        if(src==undefined) {
            document.getElementById("fileThree").click();
        }else{
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请先删除再进行添加");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return;
        }
    });
    $("#showImgFour").click(function () {
        var src=$(this).find("img").attr("src");
        if(src==undefined) {
            document.getElementById("fileFour").click();
        }else{
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请先删除再进行添加");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return;
        }
    });
    $("#showImgFive").click(function () {
        var src=$(this).find("img").attr("src");
        if(src==undefined) {
            document.getElementById("fileFive").click();
        }else{
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请先删除再进行添加");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return;
        }
    });
});


function previewImage(file){
    var objUrl = getObjectURL(file.files[0]);
    if (objUrl) {
        $("#file0").attr("src", objUrl);
    }
}
function previewImageOne(file){
    var objUrl = getObjectURL(file.files[0]);
    if (objUrl) {
        $("#file1").attr("src", objUrl);
    }
}
function previewImageTwo(file){
    var objUrl = getObjectURL(file.files[0]);
    if (objUrl) {
        $("#file2").attr("src", objUrl);
    }
}
function previewImageThree(file){
    var objUrl = getObjectURL(file.files[0]);
    if (objUrl) {
        $("#file3").attr("src", objUrl);
    }
}
function previewImageFour(file){
    var objUrl = getObjectURL(file.files[0]);
    if (objUrl) {
        $("#file4").attr("src", objUrl);
    }
}
function previewImageFive(file){
    var objUrl = getObjectURL(file.files[0]);
    if (objUrl) {
        $("#file5").attr("src", objUrl);
    }
}
function previewImageSix(file){
    var objUrl = getObjectURL(file.files[0]);
    if (objUrl) {
        $("#file6").attr("src", objUrl);
        $("#file6").removeAttr("style");
    }
}
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}