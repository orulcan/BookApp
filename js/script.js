
// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;
(function ($, window) {
    var Starrr;

    Starrr = (function () {
        Starrr.prototype.defaults = {
            rating: void 0,
            numStars: 5,
            change: function (e, value) { }
        };

        function Starrr($el, options) {
            var i, _, _ref,
                _this = this;

            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            _ref = this.defaults;
            for (i in _ref) {
                _ = _ref[i];
                if (this.$el.data(i) != null) {
                    this.options[i] = this.$el.data(i);
                }
            }
            this.createStars();
            this.syncRating();
            this.$el.on('mouseover.starrr', 'span', function (e) {
                return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
            });
            this.$el.on('mouseout.starrr', function () {
                return _this.syncRating();
            });
            this.$el.on('click.starrr', 'span', function (e) {
                return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
            });
            this.$el.on('starrr:change', this.options.change);
        }

        Starrr.prototype.createStars = function () {
            var _i, _ref, _results;

            _results = [];
            for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
            }
            return _results;
        };

        Starrr.prototype.setRating = function (rating) {
            if (this.options.rating === rating) {
                rating = void 0;
            }
            this.options.rating = rating;
            this.syncRating();
            return this.$el.trigger('starrr:change', rating);
        };

        Starrr.prototype.syncRating = function (rating) {
            var i, _i, _j, _ref;

            rating || (rating = this.options.rating);
            if (rating) {
                for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                    this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                }
            }
            if (rating && rating < 5) {
                for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                    this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                }
            }
            if (!rating) {
                return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
            }
        };

        return Starrr;

    })();
    return $.fn.extend({
        starrr: function () {
            var args, option;

            option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return this.each(function () {
                var data;

                data = $(this).data('star-rating');
                if (!data) {
                    $(this).data('star-rating', (data = new Starrr($(this), option)));
                }
                if (typeof option === 'string') {
                    return data[option].apply(data, args);
                }
            });
        }
    });
})(window.jQuery, window);

$(function () {
    return $(".starrr").starrr();
});

$(document).ready(function () {

    $('#stars').on('starrr:change', function (e, value) {
        $('#count').html(value);
    });

    $('#stars-existing').on('starrr:change', function (e, value) {
        $('#count-existing').html(value);
    });
});
function add() {
    var kitap = document.getElementById("bookName").value;
    var sayfa = document.getElementById("bookPage").value;
    var yazar = document.getElementById("bookAuthor").value;
    var soz = document.getElementById("bookWord").value;
    var dusunce = document.getElementById("bookThink").value;
    var tur = document.getElementById("bookType").value;
    var puan = document.getElementById("count").innerHTML;
    var database = firebase.database();
    
    
    var user = firebase.auth().currentUser;
    if (user != null) {
        var ref = database.ref("user").child("userId");
        name = user.userName;
        uid = user.uid;
        var data = {
            bookName: kitap,
            bookPage: sayfa,
            bookAuthor: yazar,
            bookWord: soz,
            bookThink: dusunce,
            bookCount: puan,
            bookType: tur
        };
        ref.push(data);
        console.log(uid);
    
  
    swal({
        position: 'top-end',
        type: 'success',
        title: 'Başarıyla Kaydedildi',
        showConfirmButton: false,
        timer: 1500
      });
    $(document).ready(function(){
        $('.achievement-pane').show();
        $('.achievement-pane').children().css({opacity: 0});
        
        var middle = ($(window).width() / 2) - ($('.achievement-pane').width() / 2);
       
        $('.icon').animate({top: 0, left: 0, opacity: 1}, 300);
        $('.text').delay(1100).animate({top: 0, left: 0, opacity: 1}, 300);
        $('.achievement-pane').delay(700).animate({left: middle+'px'}, 300);
        $('.text').children().eq(0).delay(2500).animate({position: 'relative', left: '120%' });
        $('.text').children().eq(1).delay(2700).animate({position: 'relative', top: '-20px' });
        
          $('.icon').delay(4500).animate({top: '-20px', left: '-0px', opacity: 0}, 300);
        $('.text').delay(3700).animate({top: '-20px', left: '-0px', opacity: 0}, 300);
        
         
      });
      for(var i = 0; i<10; i++);
      document.getElementById("value1").innerHTML= i ;
      swal({
        type: 'success',
        title: 'Kitap Başarıyla Kaydedildi',
        showConfirmButton: false,
        timer: 1500
      })
}};

