$(function () {
  // 监听游戏规则按钮的点击
  $(".rules").click(function () {
    $(".rule").stop().fadeIn(300)
  })
  // 监听关闭的点击
  $(".close").click(function () {
    $(".rule").stop().fadeOut(300)
  })
  // 监听开始游戏按钮的点击
  $(".start").click(function () {
    $(this).stop().fadeOut(300)
    // 进度条减少
    progressHandler()
    // 显示图片的内容以及出现的位置
    wolfAnimation()
  })
  // 监听重新开始按钮的点击
  $(".reStart").click(function () {
    $(".mask").stop().fadeOut(300)
    // 重新设置进度条
    progressHandler()
    // 重新执行灰太狼动画
    $(".score").text(0)
    wolfAnimation()
  })

  function progressHandler() {
    // 重新设置进度条宽度
    $(".progress").css({
      width: 180
    })
    // 开始定时器处理进度条
    const timer = setInterval(function () {
      // 获取当前进度条的宽度
      let progressWidth = $(".progress").width();
      progressWidth -= 10
      // 重新给进度条设置宽度
      $(".progress").css({
        width: progressWidth
      })
      // 进度条归零时，停止定时器
      if (progressWidth <= 0) {
        clearInterval(timer)
        // 显示重新开始界面
        $(".mask").stop().fadeIn(300)
        // 停止动画的执行
        stopWolfAnimation()
      }
    }, 500)


  }
  let wolfTimer
  let $wolfImage
  // 定义专门处理灰太狼动画的方法
  function wolfAnimation() {
    // 定义两个数组保存灰太狼和小灰灰的所有图片
    const wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png',
      './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png']
    const wolf_2 = ['./images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png',
      './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png']
    // 定义数组保存所有可能出现的位置
    const arrPos = [
      {left: '100px', top: '115px'},
      {left: '20px', top: '160px'},
      {left: '190px', top: '142px'},
      {left: '105px', top: '193px'},
      {left: '19px', top: '221px'},
      {left: '202px', top: '212px'},
      {left: '120px', top: '275px'},
      {left: '30px', top: '295px'},
      {left: '209px', top: '297px'}
    ]
    // 创建一个图片
    $wolfImage = $("<img src='' class='wolfImage'>")
    // 随机获取图片出现的位置
    let posIndex = Math.round(Math.random() * 8)
    // 设置图片显示的位置
    $wolfImage.css({
      position: "absolute",
      left: arrPos[posIndex].left,
      top: arrPos[posIndex].top
    })
    // 随机获取wolf_1与wolf_2数组中的一个
    let wolfType = Math.round(Math.random()) === 0 ? wolf_1 : wolf_2
    // 设置图片的内容
    window.wolfIndex = 0
    window.wolfIndexEnd = 5
    wolfTimer = setInterval(function () {
      $wolfImage.attr("src", wolfType[wolfIndex])
      wolfIndex++
      // 动画完毕之后，关闭定时器，重新开始一个动画
      if (wolfIndex > wolfIndexEnd) {
        $wolfImage.remove()
        clearInterval(wolfTimer)
        wolfAnimation()
      }
    }, 300)
    // 将图片添加到界面上
    $(".container").append($wolfImage)
    // 调用处理游戏规则的方法
    gameRules($wolfImage)
  }

  // 定义停止灰太狼动画的方法
  function stopWolfAnimation() {
    $(".wolfImage").remove()
    clearInterval(wolfTimer)
  }

  // 定义处理游戏规则的方法
  function gameRules($wolfImage) {
    $wolfImage.one("click", function () {
      // 修改图片的索引值
      window.wolfIndex = 5
      window.wolfIndexEnd = 9
      const $src = $(this).attr("src")
      // 根据图片地址判断是什么类型的图片
      const flag = $src.indexOf("h") >= 0
      if (flag) {
        $(".score").text(parseInt($(".score").text()) + 10);
      } else {
        $(".score").text(parseInt($(".score").text()) - 10)
      }
    })
  }
})