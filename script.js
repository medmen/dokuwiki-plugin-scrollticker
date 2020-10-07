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

    /**
     *  extend settings, incorporate live parameters
     */
    settings = jQuery.extend({
        travelocity: settings.speed / 100
    }, settings);

    console.log('native settings in liscroll:', settings);

    // get the next parent with class tickercontainer, see if it holds parameters to override global settings
    let live_params = jQuery(this).parents('.ui-newsticker');
    console.log('ticker data is ', live_params.data());

    // DANGER! the .data() function will ONLY work with lowercase parameters ;-(
    jQuery.each(live_params.data(), function(name, val){
        if(settings.hasOwnProperty(name)) {
            console.log('changing setting ', name, ' to value ', val);
            settings[name] = val;
        }
    });

    console.log('updated settings:', settings);

    /**
     *  define basic vars for ticker
     */
    let strip = jQuery(this);
    console.log('strip holds:', strip);
    
    strip.addClass("newsticker"); // this ul inside <scrollticker> gets class added

    let stripWidth = 1;
    let separator = settings.separator;
    separator = separator.replace(/\s/g, '\xa0'); //make spaces safe
    console.log('separator:', separator);

    // limit items to display if wanted
    let maxlength = strip.find("li").length - 1;
    if (settings.maxitems > 0 && settings.maxitems < maxlength) {
        maxlength = settings.maxitems;
    }

    strip.find("li").each(function(i) { //iterate through every <li>
        console.log('counting li :', i);
        // add separators between items if wanted
        let liTxt = jQuery(this).html();
        console.log('liTxt holds: ', liTxt);
        if (i < maxlength - 1) {
            jQuery(this).html(liTxt + separator); // add separator between items
        } else {
            jQuery(this).html(liTxt);
        }

        // add counter if desired
        jQuery(this).addClass("counter_" + settings.counterstyle);

        //sum up width of ticker items including separator
        stripWidth += jQuery(this, i).outerWidth(true); // thanks to Michael Haszprunar and Fabien Volpi
        console.log('stripwidth:', stripWidth);

        if (i >= maxlength) {
            jQuery(this).remove();
            // return false; // break out of loop
        }
    });
    console.log('after counters and separators strip is :', strip);

    let mask = strip.wrap("<div class='mask'></div>");
    let tickercontainer = strip.parent().wrap("<div class='tickercontainer'></div>");
    let containerWidth = strip.parent().parent().width();	//a.k.a. 'mask' width

    // enlarge strip to fit counter
    if(settings.counterstyle != 'none')
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
        if(settings.stoponhover){jQuery(this).stop();}
    },
    function(){
        let offset = jQuery(this).offset();
        let residualSpace = offset.left + stripWidth;
        let residualTime = residualSpace/settings.travelocity;
        scrollnews(residualSpace, residualTime);
    });

    ////  some final styling
    // set text color
    jQuery(".tickercontainer li").css("color", settings.textcolor);
    jQuery(".tickercontainer .li").css("color", settings.textcolor);

    // set background color
    jQuery(".tickercontainer ").css("background-color", settings.bgcolor);
    jQuery(".tickercontainer li").css("background-color", settings.bgcolor);
    jQuery(".tickercontainer .li").css("background-color", settings.bgcolor);

    // set border radius for container
    jQuery(".tickercontainer").css("border-radius", settings.borderradius);
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
        jQuery(this).liScroll(settings);
    });
});