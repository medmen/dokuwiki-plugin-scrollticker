/*!
 *
 * Based on
 * liScroll 1.0
 * Examples and documentation at:
 * http://www.gcmingati.net/wordpress/wp-content/lab/jquery/newsticker/jq-liscroll/scrollanimate.html
 * 2007-2010 Gian Carlo Mingati
 * Version: 1.0.2.1 (22-APRIL-2011)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires:
 * jQuery v1.2.x or later
 *
 * Extended to read config options from DokuWiki by M.Bohn mjbohn@gmail.com
 */


jQuery.fn.liScroll = function(settings) {
    settings = jQuery.extend({
        travelocity: JSINFO['plugin_scrollticker']['speed'] / 100
    }, settings);

    return this.each(function(){
        var $strip = jQuery(this);
        $strip.addClass("newsticker"); // each ul inside <scrollticker> gets class added
        var stripWidth = 1;
        var separator = JSINFO['plugin_scrollticker']['separator'];
        separator = separator.replace(/\s/g, '\xa0'); //make spaces safe

        $strip.find("li").each(function(i){ //iterate through every <li>
            let maxlength = $strip.find("li").length -1;
            if(settings.maxitems > 0 && settings.maxitems < maxlength) {
                maxlength = settings.maxitems;
            }

            var liTxt = jQuery( this ).html();
            if(i < $strip.find("li").maxlength) {
                jQuery(this).html(liTxt + separator); // add separator between items
            }
            else{
                jQuery(this).html(liTxt );
            }

            // add counter if desired
            jQuery( this ).addClass("counter_" + JSINFO['plugin_scrollticker']['counterstyle']);

            //sum up width of ticker items including separator
            stripWidth += jQuery(this, i).outerWidth(true); // thanks to Michael Haszprunar and Fabien Volpi
        });

        var $mask = $strip.wrap("<div class='mask'></div>");
        var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");
        var containerWidth = $strip.parent().parent().width();	//a.k.a. 'mask' width

        // enlarge strip to fit counter
        if(JSINFO['plugin_scrollticker']['counterstyle'] != 'none')
        {
            stripWidth += 21 * $strip.find('li').length; // why the hell 21 ??
        }


        $strip.width(stripWidth);

        var totalTravel = stripWidth+containerWidth;
        var defTiming = totalTravel/settings.travelocity;	// thanks to Scott Waye
        function scrollnews(spazio, tempo){
            $strip.animate({left: '-='+ spazio}, tempo, "linear", function(){
                $strip.css("left", containerWidth);
                scrollnews(totalTravel, defTiming);
            });
        }
        scrollnews(totalTravel, defTiming);
        $strip.hover(function(){
                if(JSINFO['plugin_scrollticker']['stopOnHover']){jQuery(this).stop();}
            },
            function(){
                var offset = jQuery(this).offset();
                var residualSpace = offset.left + stripWidth;
                var residualTime = residualSpace/settings.travelocity;
                scrollnews(residualSpace, residualTime);
            });
    });
};


jQuery(function(){
    // override plugin settings with matching attributes
    jQuery.each(JSINFO['plugin_scrollticker'], function (key, value) {
         if(jQuery("div.ui-newsticker").attr(key) != undefined) {
             JSINFO['plugin_scrollticker'][key] = jQuery("div.ui-newsticker").attr(key);
         }
    });

    let setting = {maxitems: JSINFO['plugin_scrollticker']['maxitems']};
    jQuery("div.ui-newsticker ul").liScroll({setting});

    // css parameters apply to container
    var $ticker = jQuery(".tickercontainer");

    let border-radius = JSINFO['plugin_scrollticker']['border-radius'])
    let new_border-radius = jQuery("div.ui-newsticker").attr('maxitems');


    $ticker.css("border-radius",JSINFO['plugin_scrollticker']['border-radius']);

    if(JSINFO['plugin_scrollticker']['showBorder']){
        $ticker.css("border",JSINFO['plugin_scrollticker']['border']);
    }

    $ticker.css("width",JSINFO['plugin_scrollticker']['width']);
    $ticker.css("height",JSINFO['plugin_scrollticker']['height']);
    $ticker.css("color",JSINFO['plugin_scrollticker']['textcolor']);
    jQuery(".tickercontainer ul li").css("color",JSINFO['plugin_scrollticker']['textcolor']);
    $ticker.css("background-color",JSINFO['plugin_scrollticker']['bgcolor']);
    jQuery(".tickercontainer ul li").css("background-color","transparent");
});
