$(document).ready(function(){

  var squares = {
    numQuads: 5,
    quadSpacing: 0,
    quadWidth: 0,
    growth: 50,
    growTime: 250,
    init: function(){
      this.cacheDom();
      this.centerElement(this.$center);
      this.bindEvents();
      this.quadSize();
      this.quadPositions();
    },
    cacheDom: function(){
      this.$center = $('#center');
      this.$quad = $('.quad');
      this.$q0 = $('#q0');
      this.$q1 = $('#q1');
      this.$q2 = $('#q2');
      this.$q3 = $('#q3');
      this.$q4 = $('#q4');
      this.$window = $(window);
      this.$body = $('body');
    },
    bindEvents: function(){
      //change to q#
      this.$q0.on('mouseenter',this.grow.bind(this.$q0)).on('mouseleave',this.shrink.bind(this.$q0));
      this.$q1.on('mouseenter',this.grow.bind(this.$q1)).on('mouseleave',this.shrink.bind(this.$q1));
      this.$q2.on('mouseenter',this.grow.bind(this.$q2)).on('mouseleave',this.shrink.bind(this.$q2));
      this.$q3.on('mouseenter',this.grow.bind(this.$q3)).on('mouseleave',this.shrink.bind(this.$q3));
      this.$q4.on('mouseenter',this.grow.bind(this.$q4)).on('mouseleave',this.shrink.bind(this.$q4));
      //change to q#
      this.$q0.on('click',this.colorSwap.bind(this.$q0));
      this.$q1.on('click',this.colorSwap.bind(this.$q1));
      this.$q2.on('click',this.colorSwap.bind(this.$q2));
      this.$q3.on('click',this.colorSwap.bind(this.$q3));
      this.$q4.on('click',this.colorSwap.bind(this.$q4));
      this.$window.on('resize',this.resizeSquares.bind(this));

    },
    centerElement: function($el){
      // needs a bit more functionality, want to make the center a % of screen size
      var heightSize = this.$window.height()*.7;
      var widthSize = this.$window.width()*.7;
      $el.css({height:heightSize,width:widthSize});
      var desiredy = this.$window.height()*.05;
      var desiredx = this.$window.width()/2-$el.width()/2;
      //var desiredy = this.$window.height()/2-$el.height()/2;
      $el.css({left:desiredx,top:desiredy});
    },
    quadSize: function(){

      //this is now how much space is left for the quads
      this.quadSpacing = this.$window.width()-(100+(this.$window.width()%100));
      this.quadWidth = this.quadSpacing/this.numQuads;
      var quadHeight = this.$window.height()*.15;
      this.$quad.css({height:quadHeight,width:this.quadWidth});
    },
    quadPositions: function(){
      //now it's the space left for the spacing
      var desiredy = this.$window.height()*.8;
      this.quadSpacing = (this.$window.width()-this.quadSpacing)/(this.numQuads+1);
      for (var i = 0; i < this.numQuads; i++) {
        var $el = $('#q'+i);
        console.log(this.$quad.css("width"));
        console.log(i);
        var desiredx = this.quadSpacing+(i*this.quadWidth+i*this.quadSpacing);
        $el.css({top: desiredy,left:desiredx});
      }
    },
    grow: function(){
      this.css({zIndex:6});
      this.animate({
        width: "+="+squares.growth+"px",
        height:"+="+squares.growth+"px",
        top:"-="+squares.growth/2+"px",
        left:"-="+squares.growth/2+"px"
      }, squares.growTime);
    },
    shrink: function(){
      this.animate({
        width: "-="+squares.growth+"px",
        height:"-="+squares.growth+"px",
        top:"+="+squares.growth/2+"px",
        left:"+="+squares.growth/2+"px"
      }, squares.growTime);
      this.css({zIndex:1});
    },
    colorSwap: function(){
      var color = this.css("background-color");
      this.css({backgroundColor: squares.$center.css("background-color")});
      squares.$center.css({backgroundColor: color});
    },
    resizeSquares: function(){
      this.centerElement(this.$center);
      this.quadSize();
      this.quadPositions();

    }
  };
  squares.init();

}); //end
