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
            document.getElementById("fileOnes").click();
    });
    $("#showImgTwo").click(function () {
            document.getElementById("fileTwo").click();
    });
    $("#showImgThree").click(function () {
            document.getElementById("fileThree").click();
    });
    $("#showImgFour").click(function () {
            document.getElementById("fileFour").click();
    });
    $("#showImgFive").click(function () {
            document.getElementById("fileFive").click();

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