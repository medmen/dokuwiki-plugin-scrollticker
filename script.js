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
        travelocity: settings.speed / 100
    }, settings);

    console.log('settings:', settings);

    // get the next parent with class tickercontainer, see if it holds parameters to override global settings
    let ticker = jQuery(this).parents('.ui-newsticker');
    console.log('ticker data is ', ticker.data());


    jQuery.each(ticker.data(), function(dname, dval){
            console.log(dname, dval);
    });

    jQuery.each(settings, function(name, value){
        console.log('evaluating key ' + name + ' with value ', value);
        if(name == 'borderradius'){
            ticker.css("border-radius", value);
        } else if(name == 'bgcolor'){
            ticker.css("background-color", value);
        } else if(name == 'textcolor'){
            ticker.css("color", value);
        } else {
            ticker.css(name, value);
        }
    });

    /**
    attr('data-collapse_after');
    if (new_setting != undefined) {
        settings = {collapse_after: new_setting};
    }

    // css parameters apply to container
    let ticker = jQuery(".tickercontainer");
    ticker.css("border-radius",JSINFO['plugin_scrollticker']['border-radius']);

    if(JSINFO['plugin_scrollticker']['showBorder']){
        ticker.css("border",JSINFO['plugin_scrollticker']['border']);
    }

    ticker.css("width",JSINFO['plugin_scrollticker']['width']);
    ticker.css("height",JSINFO['plugin_scrollticker']['height']);
    ticker.css("color",JSINFO['plugin_scrollticker']['textcolor']);
    jQuery(".tickercontainer ul li").css("color",JSINFO['plugin_scrollticker']['textcolor']);
    ticker.css("background-color",JSINFO['plugin_scrollticker']['bgcolor']);
     **/

/**
    return this.each(function(){
        let strip = jQuery(this);
        strip.addClass("newsticker"); // each ul inside <scrollticker> gets class added
        let stripWidth = 1;
        let separator = JSINFO['plugin_scrollticker']['separator'];
        separator = separator.replace(/\s/g, '\xa0'); //make spaces safe

        let maxlength = strip.find("li").length - 1;

        strip.find("li").each(function(i){ //iterate through every <li>
            if(settings.maxitems > 0 && settings.maxitems < maxlength) {
                maxlength = settings.maxitems;
            }

            let liTxt = jQuery( this ).html();
            if(i < strip.find("li").maxlength) {
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

        let mask = strip.wrap("<div class='mask'></div>");
        let tickercontainer = strip.parent().wrap("<div class='tickercontainer'></div>");
        let containerWidth = strip.parent().parent().width();	//a.k.a. 'mask' width

        // enlarge strip to fit counter
        if(JSINFO['plugin_scrollticker']['counterstyle'] != 'none')
        {
            stripWidth += 21 * strip.find('li').length; // why the hell 21 ??
        }
        strip.width(stripWidth);

        let totalTravel = stripWidth+containerWidth;
        let defTiming = totalTravel/settings.travelocity;	// thanks to Scott Waye
        function scrollnews(spazio, tempo){
            strip.animate({left: '-='+ spazio}, tempo, "linear", function(){
                strip.css("left", containerWidth);
                scrollnews(totalTravel, defTiming);
            });
        }
        scrollnews(totalTravel, defTiming);
        strip.hover(function(){
                if(JSINFO['plugin_scrollticker']['stopOnHover']){jQuery(this).stop();}
            },
            function(){
                let offset = jQuery(this).offset();
                let residualSpace = offset.left + stripWidth;
                let residualTime = residualSpace/settings.travelocity;
                scrollnews(residualSpace, residualTime);
            });
    });
**/
 };


jQuery(function(){

    console.log('JSINFO is:', JSINFO['plugin_scrollticker']);
    // override plugin settings with matching attributes
    let settings = {};
    jQuery.each(JSINFO['plugin_scrollticker'], function(skey, svalue) {
        console.log('parsing jsinfo with key: ' + skey + ' and value: ' + svalue);
        settings[skey] = svalue;
    });

    console.log('settings now: ', settings);

    jQuery("div.ui-newsticker ul").each(function(){
        console.log("starting scroll");
        jQuery(this).liScroll({settings});
    });
    jQuery(".tickercontainer ul li").css("background-color","transparent");
});
