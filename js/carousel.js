//图片轮播函数
define( function( require, exports, module ) {

    function picsPlay( picsDate, w, h, id, time ) {  

        var oCurrentPic;        //当前轮播所对应的图片
        var oCurrentBtn;        //当前轮播图片所对应的按钮
        var oCurrentPicIndex;   //当前轮播所对应图片的索引
        var autoPlay;           //自动播放
        var isStop;             //播放开关，值为1代表停止播放
        var index = 0;
        var wrap = $('#'+id);   //轮播最外层容器 

        wrap.text('');          //每次函数调用时、向wrap添加内容前置空一次
        wrap.append( '<div id="picContent"></div>' ); //添加图片内容容器

        var oPicCon = $( '#picContent' );

        //添加图片到容器中，同时对图片相关信息进行了设置
        for( var i=0; i < picsData.length; i++ ) { 
            oPicCon.append( '<a href="'+picsData[i].link+'" target="_blank"><img id="picitem'+i+'" style="display:none; z-index:'+i+'" src="'+picsData[i].url+'" /></a>' ); 
        } 
        //添加图片按钮区域，“前进”、“后退”按钮。
        wrap.append('<div id="prev" style="position:absolute;top:'+(h*0.5-35)+'px; left:4%; width:40px; line-height:70px; text-align:center; font-size:24px; color:#fff; background-color:#000; border:2px solid #fff; filter:alpha(opacity=40);opacity:0.4; z-index:10000; cursor:pointer; display:none;"><</div>');
        wrap.append('<div id="next" style="position:absolute;top:'+(h*0.5-35)+'px; right:4%; width:40px; line-height:70px; text-align:center; font-size:24px;  color:#fff; background-color:#000; border:2px solid #fff; filter:alpha(opacity=40);opacity:0.4; z-index:10000; cursor:pointer; display:none;">></div>');  
        wrap.append('<div id="picBtnWrap" style="position:absolute; right:4%; bottom:6%; width:auto; height:20px; z-index:10000;"></div>'); 
        
        var oPicBtnWrap = $('#picBtnWrap'); 
        var oPrev = $('#prev');
        var oNext = $('#next');

        oPicBtnWrap.append('<div id="picBtns" style="float:right;"></div>'); //添加图片按钮容器

        var oBtns = $('#picBtns'); 
       
        $('#prev, #next').mouseover(function(){
            isStop = 1;                               
            $('#prev, #next').css('display', 'block');//此处鼠标悬停在“向前”、“向后”按钮时也要设置其display为block。
            //虽然两个按钮都在wrap内部，但鼠标放上去后便已离开了wrap，但由于事件冒泡机制，mouseover事件依然上传至wrap，
            //所以两个按钮依旧会显示出来，但就因为这个“传递”过程导致了刚移上去时按钮会抖动，所以应该也给两个按钮加mouseover事件效果。    
        });

        oPicCon.mouseover(function(){
            isStop=1;
            oPrev.css('display', 'block');
            oNext.css('display', 'block');
        });

        oPicCon.mouseout(function(){
            isStop=0;
            oPrev.css('display', 'none');
            oNext.css('display', 'none');
        });

        oPrev.click(function(){
            if (index == 0) {
                index = picsData.length;
            }
            index --;
            setOCurrentPic( index );  // index的值改变了，所以调用setOCurrentPic函数来设置当前的显示图片
        });

        oNext.click(function(){
            if (index == picsData.length-1 ) {
                index=-1;
            } 
            index ++;
            setOCurrentPic( index );
        });

        //利用for循环，添加所有对应图片按钮 
        for( var i=0; i<picsData.length; i++ ) { 
            //增加图片所对应的按钮 
            oBtns.append('<span id="picBtn'+i+'" style="display:inline-block; width:12px; height:12px; border:solid 1px #ccc; border-radius:50%; -webkit-border-radius:50%; -moz-border-radius:50%; -o-border-radius:50%; background-color:#fff; cursor:pointer; "></span> '); 

            $('#picBtn'+i).data('index',i); // 为第i个按钮添加index值为i，即添加对应索引值，后面的运用就和图片对应起来了

            $('#picBtn'+i).click( function( event ) { 
                    if( oCurrentPic.attr('src') == $('#picitem'+$(this).data('index')).attr('src') ) { 
                        return;      //此处即为判断按钮索引值和当前图片以及本身所链接进来的图片数据的一个三者匹配判断，如果是匹配的就结束执行返回
                    } else {
                        setOCurrentPic( $(this).data('index') ); //否则便将当前图片设置为对应索引指定图片，调用函数setOCurrentPic实现。
                    }
                } 
            );      
        } 

        setOCurrentPic(0); // 设置初始值，将第一张图片设置为浏览器打开时图片

        //显示指定的图片，此处的index不是全局中的index，只是一个参数名 
        function setOCurrentPic( index ) { 

            oCurrentPicIndex = index; //将函数调用时传进来的参数值赋给当前所展示图片的索引值。

            clearInterval( autoPlay ); //定时器执行之前清除之前的定时器，防止开启多个浏览器的情况，从而达不到所要的效果。

            //快速淡出之前展示出的图片，然后将指定的图片显示出来
            if( oCurrentPic ) {
                oCurrentPic.fadeOut('fast'); 
            }
            oCurrentPic = $('#picitem'+index); 
            oCurrentPic.fadeIn('slow'); 
            //对当前图片所对应按钮样式的设置
            if( oCurrentBtn ) { 
                oCurrentBtn.css('backgroundColor','#fff'); 
            } 
            oCurrentBtn = $( '#picBtn'+index ); 
            oCurrentBtn.css( 'backgroundColor','orange' ); 
        
            //自动播放
            autoPlay = setInterval( function() {

                var index = oCurrentPicIndex + 1; 
                if ( isStop == 1 ) {
                    return 0;  
                }
                if( index > picsDate.length-1 ) {
                    index=0;
                } 
                setOCurrentPic(index);
                    
            }, time); 
        } 
    } 
    //通过exports对外提供接口
    exports.picsPlay = picsPlay;

});