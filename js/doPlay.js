//函数执行调用
define( function( require, exports, module ) {
    /*
    // 运用ajax从服务器端接收数据时所运用的执行函数
    require('js/ajax.js').ajax( 'get', '获取数据接口', '', function( data ) {
        var picsData = JSON.parse( data ); // 将获取到的JSON字符串类型数据转化为数组对象 
        var wrap = $('#picPlay');
        picsPlay( 
            picsData, 
            wrap.css('width').split('px')[0], 
            wrap.css('height').split('px')[0], 
            'picPlay'
        );
    });
    */
    // 不用ajax的情况
    picsData = [
        {url:'images/1.jpg',link:'http://ele.me'},
        {url:'images/2.jpg',link:'http://ele.me'},
        {url:'images/3.jpg',link:'http://ele.me'},
        {url:'images/4.jpg',link:'http://ele.me'},
        {url:'images/5.jpg',link:'http://ele.me'}
    ];

    var wrap = $('#picPlay');

    require('../js/carousel.js').picsPlay( 
        picsData, 
        wrap.css('width').split('px')[0],  // 只传数值进去，容器宽度
        wrap.css('height').split('px')[0], 
        'picPlay',                         // 容器的id
        4000                               // 轮播时间   
    );
});
