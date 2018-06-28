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
        $strip.addClass("newsticker");
        var stripWidth = 1;
        var separator = JSINFO['plugin_scrollticker']['separator'];
        separator = separator.replace(/\s/g, '\xa0');

        $strip.find("li").each(function(i){
            var liTxt = jQuery( this ).html();
            if(i < $strip.find("li").length -1) {
                jQuery(this).html(liTxt + separator);
            }
            else{
                jQuery(this).html(liTxt );
            }
            stripWidth += jQuery(this, i).outerWidth(true); // thanks to Michael Haszprunar and Fabien Volpi

            jQuery( this ).addClass("counter_" + JSINFO['plugin_scrollticker']['counterstyle']);

        });

        // enlarge strip to fit counter
        if(JSINFO['plugin_scrollticker']['counterstyle'] != 'none')
        {
            stripWidth += 21 * $strip.find('li').length;
        }

        var $mask = $strip.wrap("<div class='mask'></div>");
        var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");
        var containerWidth = $strip.parent().parent().width();	//a.k.a. 'mask' width
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
    jQuery("div.ui-newsticker ul").liScroll({

    });

    jQuery(".tickercontainer").css("border-radius",JSINFO['plugin_scrollticker']['border-radius']);

    if(JSINFO['plugin_scrollticker']['showBorder']){
        jQuery(".tickercontainer").css("border",JSINFO['plugin_scrollticker']['border']);
    }

    jQuery(".tickercontainer").css("width",JSINFO['plugin_scrollticker']['width']);
    jQuery(".tickercontainer").css("height",JSINFO['plugin_scrollticker']['height']);
    jQuery(".tickercontainer").css("color",JSINFO['plugin_scrollticker']['textcolor']);
});
