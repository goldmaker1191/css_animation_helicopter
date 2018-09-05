function BoxRotation(elems_selector){
    var self = this;

    self.isAnimating = false;

    var elems = $(elems_selector);
    var elems_arr = [];

    if(elems.lenght !== 0){
        elems.each(function(){
            elems_arr.push($(this));
        })
    }

    self.elems = elems_arr;

    var elems_cur_angle = [];
    $.each( self.elems, function( key, elem ) {
        var start_angle = self.get_start_angle(elem);
        elems_cur_angle.push(start_angle);
    });
    self.elems_cur_angle = elems_cur_angle;
}

BoxRotation.prototype.get_start_angle = function(elem){
    var transform_property = elem.css('transform');

    transform_property = transform_property.split('(')[1];
    transform_property = transform_property.split(')')[0];
    transform_property = transform_property.split(',');

    var a = transform_property[0];
    var b = transform_property[1];
    var c = transform_property[2];
    var d = transform_property[3];

    var scale = Math.sqrt(a*a + b*b);

    var radians = Math.atan2(b, a);
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    return angle;
}

BoxRotation.prototype.rotate_1 = function(){
    var self = this;

    if(self.isAnimating === false){
        self.isAnimating = true;
        $.each( self.elems, function( key, elem ) {
            var elem_cur_angle = self.elems_cur_angle[key];
            self.elems_cur_angle[key] = elem_cur_angle + 90;


            elem.find('div').css({'width': '50%', 'height': '50%'});

            setTimeout(function(){
                elem.css({'transform': 'rotate(' + self.elems_cur_angle[key] + 'deg)'});
            }, 1000);

            
            if( (self.elems_cur_angle[key]/90)%2 === 1){
                setTimeout(function(){
                    elem.find('div').css({'height': '100%'});
                }, 2000);
            }else{
                setTimeout(function(){
                    elem.find('div').css({'width': '100%'});
                }, 2000);
            }

            setTimeout(function(){
                self.isAnimating = false;
            }, 3000);   
        });
    }
}

BoxRotation.prototype.rotate_2 = function(){
    var self = this;

    if(self.isAnimating === false){
        self.isAnimating = true;

        $.each( self.elems, function( key, elem ) {
            var elem_cur_angle = self.elems_cur_angle[key];
            self.elems_cur_angle[key] = elem_cur_angle + 180;

            elem.find('div').css({'width': '50%', 'height': '50%'});

            setTimeout(function(){
                elem.css({'transform': 'rotate(' + self.elems_cur_angle[key] + 'deg)'});
            }, 1000);

            
            if( (self.elems_cur_angle[key]/90)%2 === 1){
                setTimeout(function(){
                    elem.find('div').css({'height': '100%'});
                }, 2000);
            }else{
                setTimeout(function(){
                    elem.find('div').css({'width': '100%'});
                }, 2000);
            }

            setTimeout(function(){
                self.isAnimating = false;
            }, 3000); 
        });
    }
}

var box_rotation = null;
$(document).ready(function(){
    box_rotation = new BoxRotation('.hellicopter__animated-box');
    $(document).on('click', '#rotate_90', function(){
        box_rotation.rotate_1();
    });
    $(document).on('click', '#rotate_180', function(){
        box_rotation.rotate_2();
    });
});