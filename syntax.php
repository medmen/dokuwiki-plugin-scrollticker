<?php
/**
 * DokuWiki Plugin scrollticker (Syntax Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  medmen <med-men@gmx.net>
 * @author Michael Bohn <mjbohn@gmail.com>
 */

// must be run within Dokuwiki
if (!defined('DOKU_INC')) die();

class syntax_plugin_scrollticker extends DokuWiki_Syntax_Plugin {
    /**
     * @return string Syntax mode type
     */
    public function getType() {
        return 'protected';
    }

    function getAllowedTypes() {
        return array('container','substition','protected','disabled','formatting','paragraphs');
    }

    /**
     * @return string Paragraph type
     */
    public function getPType() {
        return 'block';
    }
    /**
     * @return int Sort order - Low numbers go before high numbers
     */
    public function getSort() {
        return 201;
    }

    /**
     * Connect lookup pattern to lexer.
     *
     * @param string $mode Parser mode
     */
    public function connectTo($mode) {
        $this->Lexer->addEntryPattern('<scrollticker.*?>(?=.*?</scrollticker>)',$mode,'plugin_scrollticker');
    }

    public function postConnect() {
        $this->Lexer->addExitPattern('</scrollticker>','plugin_scrollticker');
    }


    /**
     * Handle matches of the scrollticker syntax
     *
     * @param string          $match   The match of the syntax
     * @param int             $state   The state of the handler
     * @param int             $pos     The position in the document
     * @param Doku_Handler    $handler The handler
     * @return array Data for the renderer
     */
    public function handle($match, $state, $pos, Doku_Handler $handler){
        $parameters = trim(substr($match, 13,-1)); // get string between "<scrollticker" and ">"
        if(strlen(trim($parameters))< 3) {
            return array($state, $match, false); // no parameters given, dont bother with extra work
        }

        $params_arr = array();
        if($parameters and strpos($parameters, '=')) { // see if we have a string and it contains at least one '='
            $parameters = preg_split('/\s+/', $parameters, -1, PREG_SPLIT_NO_EMPTY); // turn into array separated by whit spaces
            foreach($parameters as $parameter) {
                list($key, $val) = explode('=', $parameter);
                $key = 'data-'.strtolower(trim(htmlspecialchars($key))); // http://html5doctor.com/html5-custom-data-attributes/
                $val = strtolower(trim(htmlspecialchars($val)));
                $params_arr[$key] = $val;
            }
        }

        return array($state, $match, $params_arr);
    }

    /**
     * Render xhtml output or metadata
     *
     * @param string         $mode      Renderer mode (supported modes: xhtml)
     * @param Doku_Renderer  $renderer  The renderer
     * @param array          $data      The data from the handler() function
     * @return bool If rendering was successful.
     */
    public function render($mode, Doku_Renderer $renderer, $data) {
        if($mode != 'xhtml') return false;
        if (empty($data)) return false;

        list($state, $match, $parameters) = $data;

        switch ($state) {
            case DOKU_LEXER_ENTER :
                // xdebug_break();
                if(is_array($parameters) and count($parameters) > 0) {
                    // implode array fast
                    $parameters = http_build_query($parameters,'', ' ');
                }

                $renderer->doc.= '<div class="ui-newsticker" '.$parameters.'>';
                break;

            case DOKU_LEXER_UNMATCHED :
                $renderer->doc.= $renderer->_xmlEntities($match);
                break;

            case DOKU_LEXER_EXIT :
                $renderer->doc.= '</div>';
                break;

            default:
                $renderer->doc.= 'MATCH: '.$renderer->_xmlEntities($match);
                $renderer->doc.= 'STATE: '.$renderer->_xmlEntities($state);
                $renderer->doc.= 'PARAMS: '.$renderer->_xmlEntities($parameters);
        }

        // $renderer->doc .= var_export($data, true); // might be helpful when debugging
        return true;
    }
}

// vim:ts=4:sw=4:et:
