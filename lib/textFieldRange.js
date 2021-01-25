/*
# Copyright ( c ) 2021, FlyNeves - Diogo Neves. All rights reserved.

# For licensing, see LICENSE.md or MIT License ( MIT ).

# library: textFieldRangeJS - 1.0.0
___________________________________________________________________________________

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*                                                                                 *
*  The code below is long, separate in groups.                                    *
*  If you read the code, note the names of the variables, functions,              *
*  and properties of the objects.                                                 *
*                                                                                 *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

( function ( global, doc, Infinity ) {
    'use strict';
    /*
        --------<<<<<< Parent function, Initial and global data.
    */
   var _TextRangeElement;
   var _TextRangeElementData = {};
   var _ThisObjectRange;
   var dataSavedFromTheElements =  [];
   var docMode =  doc.docMode;
   var docModeInternetExplorerOld = docMode && docMode < 9 ? true : false;
   var charBreakLine = '\n';
   var charsBreakLine = '\r' + charBreakLine;
   var breakLineDefault;
   var stringHideHTMLElement = 'position:absolute;visibility:hidden;';
   var emptyString = '';
   var textFieldCloneName = 'text-field-clone';
   var textFieldPropertiesJS = requiredPropertiesCSS();
   var textFieldPropertiesCSS = ( function () {
       var lettersInHighCase = 'QWERTYUIOPASDFGHJKLZXCVBNM';
       var propertiesCSSInJS = requiredPropertiesCSS();
       var propertiesCSSInJSLength = propertiesCSSInJS.length - 1;
       var counting = -1;
       while ( counting++ < propertiesCSSInJSLength ) {
           var property = _split( propertiesCSSInJS [ counting ] , emptyString );
           var countingCharacters = -1;
           var propertiesLength = property.length - 1;
           while ( countingCharacters++ < propertiesLength ) {
               var character = property [ countingCharacters ];
               var check = _split( lettersInHighCase, character );
               if ( check.length > 1 ) {
                   property [ countingCharacters ]  = '-' + tinyName( character );
                   propertiesCSSInJS [ counting ]  = _join( property, emptyString );
               }
           }
       }
       return propertiesCSSInJS;
   } )();
   /*
       -------->>>>>>
   */
    /*
        --------<<<<<< Functions that gets the data type.
    */
    function _typeof( o ) {
        return typeof o ;
    }
    /*
        -------->>>>>>
    */
    /*
        --------<<<<<< Functions that manipulate or gets values of HTML elements.
    */
    function tinyName( stringOrElement ) {
        if ( _typeof( stringOrElement ) == 'object' ) {
            return ( stringOrElement.tagName || stringOrElement.nodeName || stringOrElement.localName ).toLowerCase();
        } else if ( stringOrElement ) {
            return stringOrElement.toLowerCase();
        }
        return false;
    }
    function HTMLdoc( element ) {
        if ( !element.docElement ) {
            while ( tinyName( element ) != 'html' && element != null ) {
                element = parentElement( element );
            }
            return parentElement( element ) || element.ownerdoc;
        }
        return element;
    }
    function parentElement( element ) {
        if ( tinyName( element ) == 'body' && !element.parentElement ) {
            element = doc.docElement;
        } else {
            if ( element.parentElement ) {
                element = element.parentElement;
            } else {
                element = element.parentNode;
            }
        }
        return element;
    }
    function getCSS( element ) {
        if ( global.getComputedStyle ) {
            return global.getComputedStyle( element );
        }
        return element.currentStyle;
    }
    function createTextNode( string ) {
        return doc.createTextNode( string ) ;
    }
    function removeChild( element ) {
        parentElement( element ).removeChild( element ) ;
    }
    function createElement( tagName ) {
        return doc.createElement( tagName ) ;
    }
    function createTextRange( element ) {
        return element.createTextRange( element ) ;
    }
    function appendChild( element, append ) {
        return element.appendChild( append ) ;
    }
    function textContent( element, text ) {
        if ( element.textContent || _typeof( element.textContent == 'string' ) ) {
            element.textContent = text;
        } else if ( element.nodeValue || _typeof( element.nodeValue == 'string' ) ) {
            element.nodeValue = text;
        } else {
            element.innerText = text;
        }
    }
    /*
        -------->>>>>>
    */
    /*
        --------<<<<<< Functions that manipulate and verify string
    */
    function _split( string, character ) {
        return string.split( character );
    }
    function _join( string, character ) {
        return string.join( character );
    }
    function _substring( string, start, end ) {
        return string.substring( start, end );
    }
    /*
        -------->>>>>>
    */
    /*
        --------<<<<<< Functions that get data from the current selection in the text field.
    */
    function getSelectionPositions( normalizePositions ) {
        var start = 0,
            end = 0,
            normalizedValue,
            range,
            textInputRange,
            endRange,
            value = _TextRangeElement.value;
        if ( _typeof( _TextRangeElement.selectionEnd == 'number' ) && _typeof( _TextRangeElement.selectionStart ) == 'number' ) {
            start = _TextRangeElement.selectionStart;
            end = _TextRangeElement.selectionEnd;
        } else {
            range = doc.selection.createRange();
            if ( range && range.parentElement() == _TextRangeElement ) {
                var valueLength = value.length;
                normalizedValue = value.replace( /\r\n/g, charBreakLine );
                textInputRange = createTextRange( _TextRangeElement );
                textInputRange.moveToBookmark( range.getBookmark() );
                endRange = createTextRange( _TextRangeElement );
                endRange.collapse( false );
                if ( textInputRange.compareEndPoints( 'StartToEnd', endRange ) > -1 ) {
                    start = end = valueLength;
                } else {
                    start = -textInputRange.moveStart( 'character', -valueLength );
                    start += _split( normalizedValue.slice( 0, start ), charBreakLine ).length - 1;
                    if ( textInputRange.compareEndPoints( 'EndToEnd', endRange ) > -1 ) {
                        end = valueLength;
                    } else {
                        end = -textInputRange.moveEnd( 'character', -valueLength );
                        end += _split( normalizedValue.slice( 0, end ), charBreakLine ).length - 1;
                    }
                }
            }
        }
        if ( normalizePositions ) {
            start = _substring( value, start - 1, start ) == '\r' ? start++ : start;
            end = _substring( value, end - 1, end ) == '\r' ? end++ : end;
            start += _substring( value, 0, start ).length - normalizeBreakLine( _substring( value, 0, start ) ).length;
            end += _substring( value, 0, end ).length - normalizeBreakLine( _substring( value, 0, end ) ).length;
        }
        return {
            selectionStart: start,
            selectionEnd: end
        };
    }
    function getSelectionData( normalizePositions ) {
        var selectionPositions = getSelectionPositions( normalizePositions );
        var selectionStart = selectionPositions.selectionStart;
        var selectionEnd = selectionPositions.selectionEnd;
        var valueLength = _TextRangeElement.value.length;
        var beforeSelection = _substring( _TextRangeElement.value, 0, selectionStart );
        var selectionText = _substring( _TextRangeElement.value, selectionStart, selectionEnd );
        var afterSelection = _substring( _TextRangeElement.value, selectionEnd, valueLength );
        return {
            afterSelection: afterSelection,
            beforeSelection: beforeSelection,
            selectionText: selectionText,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd
        };
    }
    /*
        -------->>>>>>
    */
  
    /*
        --------<<<<<< Functions that perform actions in the text field.
    */
   function stringSize( string, remove ) {
    updateElementData( Object(this) );
    return size( string, remove );
   }
    function size( string, remove ) {
        string = string.toString();
        var stringWidth;
        var stringHeight;
        var charsHeight;
        var _TextRangeElementStyle = _TextRangeElement.style;
        var _TextRangeElementStyleHeight =  _TextRangeElementStyle.height;
        var currentLineHeight = _TextRangeElementStyle.lineHeight;
        var currentLineHeightPx;
        var valueOriginal = _TextRangeElement.value;
        var selectionPositions = getSelectionPositions();
        var selectionStart = selectionPositions.selectionStart;
        var selectionEnd = selectionPositions.selectionEnd;
        if ( docModeInternetExplorerOld ) {
            var value = _TextRangeElement.value;
            var range;
            _TextRangeElement.value = string;
            range = createTextRange( _TextRangeElement );
            range.collapse( true );
            range.moveEnd( 'character', _TextRangeElement.value.length );
            range.moveStart( 'character', 0 );
            stringWidth = range.boundingWidth;
            if ( !_TextRangeElementData.noRemove ) {
                _TextRangeElementData.cloneTextarea = createElement( "textarea" );
                appendChild( _TextRangeElementData.body, _TextRangeElementData.cloneTextarea );
            }
            var cloneTextarea = _TextRangeElementData.cloneTextarea;
            var cloneTextareaStyle = cloneTextarea.style;
            cloneTextarea.value = 'd';
            cloneTextarea.style.cssText = stringHideHTMLElement;
            cloneTextareaStyle.height = '0';
            cloneTextareaStyle.borderWidth = '0';
            cloneTextareaStyle.padding = '0';
            cloneTextareaStyle.lineHeight = getCSS( _TextRangeElement ).lineHeight;
            currentLineHeightPx = _TextRangeElementData.cloneTextarea.scrollHeight - _TextRangeElementData.cloneTextarea.offsetHeight;
            _TextRangeElementStyle.lineHeight = 'normal';
            charsHeight = range.boundingHeight;
            _TextRangeElement.value = value;
            _TextRangeElementStyle.lineHeight = currentLineHeight;
            if ( !remove ) {
                removeChild( _TextRangeElementData.cloneTextarea );
                _TextRangeElementData.noRemove = false;
            }
            select( selectionStart, selectionEnd );
            while ( charsHeight > currentLineHeightPx ) {
                charsHeight -= currentLineHeightPx;
            }
        } else {
            if ( !_TextRangeElementData.noRemove ) {
                _TextRangeElementData.cloneNode = createElement( textFieldCloneName );
                _TextRangeElementData.childClone = createElement( textFieldCloneName );
                _TextRangeElementData.nodeText = createTextNode( emptyString );
                _TextRangeElementData.childText = createTextNode( emptyString );
                _TextRangeElementData.cloneNode.style.cssText = _TextRangeElementData.cssProperties;
                _TextRangeElementData.childClone.float = 'left';
                appendChild( _TextRangeElementData.childClone, _TextRangeElementData.childText );
                appendChild( _TextRangeElementData.cloneNode, _TextRangeElementData.nodeText );
                appendChild( _TextRangeElementData.cloneNode, _TextRangeElementData.childClone );
                appendChild( _TextRangeElementData.body, _TextRangeElementData.cloneNode );
            }
            if ( _typeof( string ) != 'string' ) {
                removeChild( _TextRangeElementData.cloneNode );
                _TextRangeElementData.noRemove = false;
                return true;
            }
            if ( _substring( string, string.length - 1, string.length ) == charBreakLine ) {
                string = _substring( string, 0, string.length - 1 );
            }
            var childClone = _TextRangeElementData.childClone;
            var childCloneStyle = childClone.style;
            if(_TextRangeElementData.isInputElement){
                string = _join( _split( string, breakLineDefault ), emptyString ).replace( /[ ]+/g, '\u00a0' );
            }
            _TextRangeElementData.cloneNode.style.lineHeight = _TextRangeElementData.elementCSS.lineHeight;
            textContent( _TextRangeElementData.nodeText, emptyString );
            textContent( _TextRangeElementData.childText, string );
            childCloneStyle.lineHeight = _TextRangeElementData.elementCSS.lineHeight;
            childCloneStyle.display = 'inline-block';
            childCloneStyle.float = 'left';
            stringWidth = childClone.clientWidth;
            textContent( _TextRangeElementData.childText, '|' );
            currentLineHeightPx = childClone.clientHeight;
            childCloneStyle.lineHeight = 'normal';
            charsHeight = childClone.clientHeight;
            _TextRangeElementData.cloneNode.style.lineHeight = currentLineHeight;
            if ( !remove ) {
                removeChild( _TextRangeElementData.cloneNode );
                _TextRangeElementData.noRemove = false;
            }
        }
        if ( remove ) {
            _TextRangeElementData.noRemove = true;
        }
        _TextRangeElement.value = string;
        _TextRangeElementStyle.height = currentLineHeightPx + "px";
        _TextRangeElement.scrollTop = 10/* force the internet explore recognize the real value of scrollHeight*/;
        stringHeight = ( parseInt( ( _TextRangeElement.scrollHeight - _TextRangeElementData.paddingY ) / currentLineHeightPx )) * currentLineHeightPx
        _TextRangeElementStyle.height = _TextRangeElementStyleHeight;
        _TextRangeElement.value = valueOriginal;
        select( selectionStart, selectionEnd);
        return {
            "height": stringHeight,
            "width": stringWidth,
            "charsHeight": charsHeight,
            "lineHeight": currentLineHeightPx
        };;
    }
    function selectText( start, end, developerCall ) {
        updateElementData( Object(this) );
        select( start, end, developerCall );
        return NewTextRangeObject();
    }
    function select( start, end, developerCall ) {
        if ( _typeof( start ) != 'number' ) {
            start = 0;
            end = Infinity;
        }
        function normalize( limit ) {
            var countingCharacters = 0;
            var value = _split( _TextRangeElement.value, emptyString );
            var result = 0;
            while ( countingCharacters < limit ) {
                if ( value [ countingCharacters ]  + value [ countingCharacters + 1 ]  == charsBreakLine ) {
                    countingCharacters++;
                    result++;
                }
                countingCharacters++;
            }
            return limit - result;
        }
        if ( _typeof( end ) != 'number' ) {
            end = start;
        }
        var value = _TextRangeElement.value;
        var valueLength = value.length;
        start = start > valueLength ? valueLength : start < 0 ? 0 : start;
        end = end > valueLength ? valueLength : end < 0 ? 0 : end;
        start = _substring( value, start - 1, start ) == '\r' ? start++ : start;
        end = _substring( value, end - 1, end ) == '\r' ? end++ : end;
        var normalizeInternetExplorerStart = _substring( value, 0, start ).length - normalizeBreakLine( _substring( value, 0, start ) ).length;
        var normalizeInternetExplorerEnd = _substring( value, 0, end ).length - normalizeBreakLine( _substring( value, 0, end ) ).length;
        start = normalize( start );
        end = normalize( end );
        if ( developerCall ) {
            start += normalizeInternetExplorerStart;
            end += normalizeInternetExplorerEnd;
        }
        if ( _TextRangeElement.setSelectionRange ) {
            _TextRangeElement.focus();
            _TextRangeElement.setSelectionRange( start, end );
        } else if ( _TextRangeElement.createTextRange ) {
            var range = createTextRange( _TextRangeElement );
            range.collapse( true );
            range.moveEnd( 'character', end );
            range.moveStart( 'character', start );
            range.select();
        } else {
            _TextRangeElement.selectionStart = start;
            _TextRangeElement.selectionEnd = end;
            _TextRangeElement.focus();
        }
    }
    function insert( replace, selectText ) {
        updateElementData( Object(this) );
        return insertOrReplace( replace, selectText, 'insert' );
    }
    function replaceSelection( replace, selectText ) {
        updateElementData( Object(this) );
        return insertOrReplace( replace, !selectText ? true : false , 'replace' );
    }
    function insertOrReplace( replace, selectText, iOrR ) {
        replace = replace.toString();
        replace = replace + emptyString;
        var selectionData = getSelectionData();
        var selectionText = selectionData.selectionText;
        var afterSelection = selectionData.afterSelection;
        var beforeSelection = selectionData.beforeSelection;
        var beforeSelectionLength = beforeSelection.length;
        var replaceLength = replace.length;
        if ( iOrR == 'insert' ) {
            beforeSelection = beforeSelection + selectionText + replace;
            beforeSelectionLength = beforeSelection.length;
            _TextRangeElement.value = beforeSelection + afterSelection;
            if ( selectText ) {
                select( beforeSelectionLength - replaceLength, beforeSelectionLength );
            } else {
                select( beforeSelectionLength );
            }
        } else {
            _TextRangeElement.value = beforeSelection + replace + afterSelection;
            if ( selectText ) {
                select( beforeSelectionLength, beforeSelectionLength + replaceLength );
            } else {
                select( beforeSelectionLength + replaceLength );
            }
        }
        return NewTextRangeObject();
    }
    function appendString( position, string, selectText ) {
        string = string.toString();
        updateElementData( Object(this) );
        var value = _TextRangeElement.value;
        var selectionData = getSelectionData();
        position = _substring( value, position - 1, position ) == '\r' ? position++ : position;
        position += _substring( value, 0, position ).length - normalizeBreakLine( _substring( value, 0, position ) ).length;
        _TextRangeElement.value = _substring( value, 0, position ) + string + _substring( value, position, Infinity );
        if ( selectText ) {
            select( position, position + string.length );
        } else {
            select( selectionData.selectionStart, selectionData.selectionEnd );
        }
        return NewTextRangeObject();
    }
    function setCaret( lineOrPosition, position ) {
        updateElementData( Object(this) );
        if ( _typeof( position ) != 'number' ) {
            select( lineOrPosition, false, 1 );
        } else {
            var lines = getTextFieldData( 'allText' ).lines;
            var linesLength = lines.length - 1;
            var countingLines = 0;
            var countingCharacters = 0;
            var zeroNegative = -0.1;
            position = lineOrPosition > linesLength ? -0.1 : position;
            lineOrPosition = lineOrPosition <= linesLength ? lineOrPosition : linesLength;
            while ( countingLines <= linesLength ) {
                var lineString = normalizeBreakLine( lines [ countingLines ] );
                var lineStringLength = lineString.length;
                if ( lineOrPosition == countingLines ) {
                    if ( position <= zeroNegative ) {
                        if ( position == zeroNegative ) {
                            position = lineStringLength;
                        } else {
                            position = lineStringLength - Math.abs( position );
                            position = position < 0 ? 0 : position;
                        }
                    }
                    if ( position > lineStringLength ) {
                        select( countingCharacters + lineStringLength -1 );
                    } else {
                        select( countingCharacters + position, false, 1 );
                    }
                    break;
                }
                countingCharacters += lineStringLength;
                countingLines++;
            }
        }
        return NewTextRangeObject();
    }
    //get
    function findString( string ) {
        string = string.toString();
        var countingCharacters = 0;
        var value = normalizeBreakLine( _TextRangeElement.value );
        var valueLength = value.length;
        var stringLength = string.length;
        var object =  [];
        while ( countingCharacters < valueLength ) {
            var end = countingCharacters + stringLength;
            if ( _substring( value, countingCharacters, end ) == string ) {
                object [ object.length ]  = {
                    start: countingCharacters,
                    end: end,
                    string: string
                };
                countingCharacters += stringLength;
            }
            countingCharacters++;
        }
        return object.length == 0 ? false : object;
    }
    function moveCaret( keyCode ) {
        updateElementData( Object(this) );
        function setCaretPosition( futureLineCaret ) {
            currentLine = currentLine > 0 ? currentLine : 0;
            futureLineCaret = futureLineCaret > 0 ? futureLineCaret : 0;
            var textFieldLinesLength = textFieldLines.length;
            futureLineCaret = futureLineCaret > textFieldLinesLength -1 ? textFieldLinesLength -1: futureLineCaret;
            var lineString = _split( textFieldLines [ futureLineCaret ] , emptyString );
            var lineLength = lineString.length - 1;
            var countingLines = 0;
            var countingCharacters = optimizationStart;
            while ( countingLines < futureLineCaret ) {
                countingCharacters += textFieldLines [ countingLines ] .length;
                countingLines++;
            }
            if ( keyCode == 36 || keyCode == 35 ) {
                if ( keyCode == 35 ) {
                    if ( textFieldLinesLength - 1 == currentLine ) {
                        select( Infinity );
                    } else {
                        select( countingCharacters + lineLength );
                    }
                } else {
                    select( countingCharacters );
                }
            } else {
                var currentStringPosition = _TextFieldDataObject.stringBeforeCaretAndAfterLine;
                var newStringPosition = currentStringPosition.length;
                var currentStringPositionWidth = size( currentStringPosition, true )[ "width" ] / currentStringPosition.length;
                var verifyWidth = size( _substring( textFieldLines [ futureLineCaret ] , 0, newStringPosition ), true )[ "width" ] / newStringPosition;
                var caretPosition = countingCharacters;
                if ( currentStringPositionWidth < verifyWidth ) {
                    newStringPosition--;
                } else if ( currentStringPositionWidth > verifyWidth ) {
                    newStringPosition++;
                }
                if ( futureLineCaret == currentLine ) {
                    if ( keyCode == 40 || keyCode == 34 ) {
                        caretPosition = Infinity;
                    }
                } else {
                    caretPosition += newStringPosition;
                }
                select( caretPosition );
                size( false );
            }
        }
        function moveByPage() {
            var counting = 0;
            var height = 0;
            while ( height <= _TextRangeElementData.textFieldHeight ) {
                height += _TextRangeElementData.lineHeightInPX;
                counting++;
            }
            counting -= 1;
            if ( counting < 0 ) {
                counting = 1;
            }
            if ( keyCode == 33 ) {
                return currentLine - counting || 0;
            }
            return currentLine + counting || textFieldLines.length - 1;
        }
        var _TextFieldDataObject = keyCode == 33 || keyCode == 34 ? getTextFieldData( 'page' ) : getTextFieldData( 'line' );
        var textFieldLines = _TextFieldDataObject.lines;
        var optimizationStart = _TextFieldDataObject.optimizationStart;
        var currentLine = _TextFieldDataObject.currentLine;
        if ( keyCode == 37 || keyCode == 39 ) {
            var end = getSelectionPositions().selectionEnd;
            if ( keyCode == 37 ) {
                select( end - 1 );
            } else {
                select( end + 1 );
            }
        } else {
            switch ( keyCode ) {
                case 33:
                case 34:
                    setCaretPosition( moveByPage() );
                    break;
                case 35:
                case 36:
                    setCaretPosition( currentLine );
                    break;
                case 38:
                    setCaretPosition( currentLine - 1 );
                    break;
                case 40:
                    setCaretPosition( currentLine + 1 );
                    break;
            }
        }
        return NewTextRangeObject();
    }
    function getLines() {
        updateElementData( Object(this) );
        var _TextFieldDataObject =  getTextFieldData( 'allText' );
        NewTextRangeObject( _TextFieldDataObject );
        return _TextFieldDataObject.lines;
    }
    function breakLines( apply ) {
        updateElementData( Object(this) );
        var _TextFieldDataObject = getTextFieldData( 'allText' );
        var lines = _TextFieldDataObject.lines;
        var singleLine = _TextFieldDataObject.singleLine;
        if ( !singleLine ) {
            var counting = 0;
            var selection = getSelectionPositions();
            var start = selection.selectionStart;
            var end = selection.selectionEnd;
            while ( counting < lines.length - 1 ) {
                var line = lines [ counting ];
                var splitGet = _split( line, breakLineDefault );
                if ( splitGet.length < 2 ) {
                    lines [ counting ]  = _join( splitGet, emptyString ) + breakLineDefault;
                }
                counting++;
            }
            if ( apply ) {
                _TextRangeElement.value = _join( lines, emptyString );
                select( start, end );
            }
            NewTextRangeObject();
            return lines;
        }
        else {
            return lines;
        }
    }
    function refresh() {
        updateElementData( Object(this) );
        return NewTextRangeObject();
    }
    /*
        -------->>>>>>
    */
    /*
        --------<<<<<< Functions that gets or manipulate the value contained in the text field.
    */
    function charsWidth( character, charsArray ) {
        charsArray = charsArray ||  _TextRangeElementData.charactersWidthForTheProcess;
        var counting = charsArray.length;
        while ( counting-- > 0 ) {
            var charObject = charsArray [ counting ];
            if ( charObject.character == character ) {
                return charObject.width;
            }
        }
        return 0;
    }
    function lineBreakPosition( lines ) {
        function replace( string, stringReplace ) {
            return string.replace( /\r/g, stringReplace );
        }
        var newLines =  [];
        var countingWords = 0;
        var arrayLength = lines.length;
        while ( countingWords < arrayLength ) {
            var line = lines [ countingWords ];
            if ( line.search( /[\r]+/g ) >= 0 && line.search( /[\n] +/g ) < 0 ) {
                line = replace( line, charsBreakLine );
            }
            line = replace( line, emptyString );
            var charBreakPosition = _split( _substring( line, 0, 2 ), emptyString );
            var newLinesLength = newLines.length;
            if ( charBreakPosition [ 0 ]  == charBreakLine || charBreakPosition [ 1 ]  == charBreakLine ) {
                var breakCompleteLineLength = charBreakLine.length;
                if ( line == charBreakLine ) {
                    if ( newLinesLength > 0 ) {
                        charBreakPosition = replace( newLines [ newLinesLength - 1 ] , emptyString );
                        if ( _substring( charBreakPosition, charBreakPosition.length - 1, charBreakPosition.length ) == charBreakLine ) {
                            newLines [ newLinesLength ]  = breakLineDefault;
                        } else {
                            newLines [ newLinesLength - 1 ]  = newLines [ newLinesLength - 1 ]  + breakLineDefault;
                        }
                    } else {
                        newLines [ 0 ]  = breakLineDefault;
                    }
                } else {
                    if ( newLinesLength > 0 ) {
                        charBreakPosition = replace( newLines [ newLinesLength - 1 ] , emptyString );
                        if ( _substring( charBreakPosition, charBreakPosition.length - 1, charBreakPosition.length ) == charBreakLine ) {
                            newLines [ newLinesLength ]  = breakLineDefault;
                            newLines [ newLinesLength + 1 ]  = _substring( line, breakCompleteLineLength, Infinity );
                        } else {
                            newLines [ newLinesLength - 1 ]  = newLines [ newLinesLength - 1 ]  + breakLineDefault;
                            newLines [ newLinesLength ]  = _substring( line, breakCompleteLineLength, Infinity );
                        }
                    } else {
                        newLines [ 0 ]  = breakLineDefault;
                        newLines [ 1 ]  = _substring( line, breakCompleteLineLength, Infinity );
                    }
                }
            } else if ( _typeof( line ) == 'string' ) {
                newLines [ newLinesLength ]  = line;
            }
            countingWords++;
        }
        return newLines;
    }
    function rangeAgain( object, selectionStart, selectionEnd ) {
        object.collapse( true );
        object.moveEnd( 'character', selectionEnd || selectionStart );
        object.moveStart( 'character', selectionStart );
        return object;
    }
    function reduceTextProcessing( selection, value, processingType ) {
        var lineHeightInPX = _TextRangeElementData.lineHeightInPX;
        var selectionText = selection.selectionText;
        var beforeSelection = selection.beforeSelection;
        var beforeSelectionChars = _split( beforeSelection, emptyString );
        var beforeSelectionCharsLength = beforeSelectionChars.length;
        var afterSelection = selection.afterSelection;
        var valueChars = _split( value, emptyString );
        var afterSelectionLength = beforeSelectionCharsLength + selectionText.length + afterSelection.length;
        var lineWidth = 0;
        var requiredLines = 0;
        var checkTheRequiredLines = processingType == 'page' ? _TextRangeElementData.textFieldHeight : lineHeightInPX * 5;
        var optimizationStart = 0;
        var counting = 0;
        var countingLines = 0;
        var selectionEnd = selection.selectionEnd;
        checkTheRequiredLines = checkTheRequiredLines > _TextRangeElementData.textFieldHeight ? _TextRangeElementData.textFieldHeight + lineHeightInPX: checkTheRequiredLines;
        while ( ( counting += lineHeightInPX ) <= checkTheRequiredLines ) {
            requiredLines++;
        }
        counting = beforeSelectionCharsLength;
        while ( counting-- > -1 && countingLines < requiredLines ) {
            if ( lineWidth < _TextRangeElementData.textFieldWidth ) {
                lineWidth += charsWidth( beforeSelectionChars [ counting ], _TextRangeElementData.charactersWidth );
            } else {
                lineWidth = 0;
                countingLines++;
            }
        }
        countingLines = 0;
        optimizationStart = counting > 0 ? counting + 1 : 0;
        counting = selectionEnd;
        lineWidth = 0;
        while ( counting++ < afterSelectionLength && countingLines < requiredLines ) {
            if ( lineWidth < _TextRangeElementData.textFieldWidth ) {
                lineWidth += charsWidth( valueChars [ counting ], _TextRangeElementData.charactersWidth );
            } else {
                lineWidth = 0;
                countingLines++;
            }
        }

        return {
            optimizedText: _substring( value, optimizationStart, counting ),
            optimizationStart: optimizationStart
        };
    }
    function getTextFieldData( processingType ) {
        _TextRangeElement.focus();
        var lines =  [];
        var selectionData = getSelectionData();
        var selectionStart = selectionData.selectionStart;
        var selectionEnd = selectionData.selectionEnd;
        var realSelectionEnd = selectionEnd;
        var value = _TextRangeElement.value;
        var valueOriginal = value;
        var caretPositionTagName = 'caret-position';
        var counting = 1;
        var processedLine = emptyString;
        var linesOptimized =  [];
        var stringWidth = 0;
        var minLineWidth = 0;
        var optimizationStart = 0;
        var countingCharacters = 0;
        var allCharacters = _split( value, emptyString );
        var allCharactersLength = allCharacters.length;
        var currentElementMargin = _TextRangeElement.style.margin;
        var textFieldClone;
        var textFieldCloneStyle;
        var textBeforeCaretElement;
        var textAfterCaretElement;
        var caretElement;
        var heightOfTextPreviousToCaret;
        var lastHeightOfTextPreviousToCaret;
        var singleLine = true;
        var optimizedText;
        var currentCharacter;
        _TextRangeElement.style.margin = '0';
        _TextRangeElement.value = charBreakLine + ' break line default ' + charsBreakLine;
        breakLineDefault = _TextRangeElement.value;
        breakLineDefault = _split( breakLineDefault, charsBreakLine ).length > 1 ? charsBreakLine : charBreakLine;
        _TextRangeElement.value = valueOriginal;
        select( selectionStart, realSelectionEnd );
        if ( docModeInternetExplorerOld ) {
            select( 0 );
            var textRange = createTextRange( _TextRangeElement );
            while ( countingCharacters < allCharactersLength ) {
                currentCharacter = allCharacters [ countingCharacters ];
                var characterWidth;
                if ( _split( _TextRangeElementData.knownCharacters, currentCharacter ).length == 1 ) {
                    if ( currentCharacter == '\n' || currentCharacter == '\r' ) {
                        _TextRangeElementData.charactersWidthForTheProcess [ _TextRangeElementData.charactersWidthForTheProcess.length ]  = {
                            width: 0,
                            character: currentCharacter
                        };
                    } else {
                        _TextRangeElement.value = currentCharacter;
                        characterWidth = createTextRange( _TextRangeElement ).boundingWidth;
                        minLineWidth = minLineWidth < characterWidth ? characterWidth : minLineWidth;
                        _TextRangeElementData.charactersWidthForTheProcess [ _TextRangeElementData.charactersWidthForTheProcess.length ]  = {
                            width: characterWidth,
                            character: currentCharacter
                        };
                    }
                    _TextRangeElementData.charsList [ _TextRangeElementData.charsList.length ]  = {
                        character: currentCharacter,
                        amount: _split( valueOriginal, currentCharacter ).length - 1
                    };
                    _TextRangeElementData.knownCharacters = _TextRangeElementData.knownCharacters + currentCharacter;
                }
                characterWidth = charsWidth( currentCharacter );
                minLineWidth = minLineWidth < characterWidth ? characterWidth : minLineWidth;
                countingCharacters++;
            }
            _TextRangeElementData.charactersWidth = _TextRangeElementData.charactersWidthForTheProcess;
        } else {
            textFieldClone = createElement( textFieldCloneName );
            textBeforeCaretElement = createTextNode( emptyString );
            textAfterCaretElement = createTextNode( emptyString );
            caretElement = createElement( caretPositionTagName );
            caretElement.style.display = 'inline';
            textFieldCloneStyle = textFieldClone.style;
            textFieldCloneStyle.cssText = _TextRangeElementData.cssProperties;
            textFieldCloneStyle.overflowX = _TextRangeElementData.overflowXValue;
            textFieldCloneStyle.overflowY = _TextRangeElementData.overflowYValue;
            appendChild( _TextRangeElementData.body, textFieldClone );
            appendChild( textFieldClone, textBeforeCaretElement );
            appendChild( textFieldClone, caretElement );
            appendChild( textFieldClone, textAfterCaretElement );
            var textFieldCloneWidth = _TextRangeElementData.textFieldCloneWidth;
            while ( countingCharacters < allCharactersLength ) {
                currentCharacter = allCharacters [ countingCharacters ];
                var characterWidth;
                if ( _split( _TextRangeElementData.knownCharacters, currentCharacter ).length == 1 ) {
                    var insertInKey = _TextRangeElementData.charactersWidthForTheProcess.length;
                    if ( currentCharacter == '\n' || currentCharacter == '\r' ) {
                        _TextRangeElementData.charactersWidthForTheProcess [ insertInKey ]  = {
                            width: 0,
                            character: currentCharacter
                        };
                        _TextRangeElementData.charactersWidth [ insertInKey ]  = {
                            width: 0,
                            character: currentCharacter
                        };
                    } else {
                        textContent( textBeforeCaretElement, currentCharacter == " " && _TextRangeElementData.isInputElement ? '\u00a0' :currentCharacter );
                        characterWidth = caretElement.offsetLeft - textFieldClone.offsetLeft;
                        if( characterWidth == 0 && currentCharacter == ' ' && !textFieldCloneWidth ){
                            textContent( textBeforeCaretElement, currentCharacter == ' '  ? '\u00a0': currentCharacter );
                            characterWidth = caretElement.offsetLeft - textFieldClone.offsetLeft;
                            textFieldCloneWidth =  _TextRangeElementData.widthReal - characterWidth + 'px';
                        }
                        minLineWidth = minLineWidth < characterWidth ? characterWidth : minLineWidth;
                        _TextRangeElementData.charactersWidthForTheProcess [ insertInKey ]  = {
                            width: characterWidth,
                            character: currentCharacter
                        };
                        _TextRangeElementData.charactersWidth [ insertInKey ]  = {
                            width: characterWidth - _TextRangeElementData.paddingLeft,
                            character: currentCharacter
                        };
                    }
                    _TextRangeElementData.charsList [ _TextRangeElementData.charsList.length ]  = {
                        character: currentCharacter,
                        amount: _split( valueOriginal, currentCharacter ).length - 1
                    };
                    _TextRangeElementData.knownCharacters = _TextRangeElementData.knownCharacters + currentCharacter;
                }
                characterWidth = charsWidth( currentCharacter );
                minLineWidth = minLineWidth < characterWidth ? characterWidth : minLineWidth;
                countingCharacters++;
            }
            if( textFieldCloneWidth ){
                textFieldCloneStyle.width = textFieldCloneWidth;
                _TextRangeElementData.textFieldCloneWidth = textFieldCloneWidth;
            }
        }
        _TextRangeElement.value = valueOriginal;
        if ( _TextRangeElement.scrollWidth - _TextRangeElement.clientWidth < 21 && !_TextRangeElementData.isInputElement ) {
            minLineWidth += 1;
            if ( processingType == 'allText' ) {
                optimizedText = value;
            } else {
                var optimized = reduceTextProcessing( selectionData, value, processingType );
                optimizedText = optimized.optimizedText;
                optimizationStart = optimized.optimizationStart;
            }
            if ( docModeInternetExplorerOld ) {
                selectionEnd = counting = optimizedText.length;
                textRange.collapse( true );
                textRange.moveEnd( 'character', counting + optimizationStart );
                textRange.moveStart( 'character', 0 );
                lastHeightOfTextPreviousToCaret = textRange.boundingHeight;
                _TextRangeElementData.textFieldOffsetLeft = textRange.offsetLeft;
                stringWidth = rangeAgain( textRange, counting ).boundingLeft - _TextRangeElementData.paddingLeft - _TextRangeElementData.textFieldOffsetLeft;
                while ( counting-- > -1 ) {
                    currentCharacter = _substring( optimizedText, counting, counting + 1 );
                    if ( currentCharacter == '\r' ) {
                        continue;
                    }
                    stringWidth -= charsWidth( currentCharacter );
                    if ( stringWidth <= minLineWidth || currentCharacter == charBreakLine ) {
                        var charEnd = normalizeBreakLine( _substring( optimizedText, 0, optimizationStart + counting ) ).length;
                        var range = createTextRange( _TextRangeElement );
                        range.collapse( true );
                        range.moveEnd( 'character', charEnd );
                        range.moveStart( 'character', 0 );
                        heightOfTextPreviousToCaret = range.boundingHeight;
                        if ( heightOfTextPreviousToCaret != lastHeightOfTextPreviousToCaret ) {
                            processedLine = _substring( optimizedText, counting, selectionEnd );
                            if ( processedLine != emptyString ) {
                                linesOptimized [ linesOptimized.length ]  = processedLine;
                            }
                            selectionEnd -= processedLine.length;
                            counting = selectionEnd + 1;
                            processedLine = emptyString;
                            stringWidth = rangeAgain( range, optimizationStart + counting ).boundingLeft - _TextRangeElementData.paddingLeft - _TextRangeElementData.textFieldOffsetLeft;
                            lastHeightOfTextPreviousToCaret = heightOfTextPreviousToCaret;
                        } else if ( currentCharacter == charBreakLine ) {
                            processedLine = _substring( optimizedText, counting, selectionEnd );
                            if ( processedLine != emptyString ) {
                                linesOptimized [ linesOptimized.length ]  = processedLine;
                            }
                            counting--;
                            range = createTextRange( _TextRangeElement );
                            range.collapse( true );
                            range.moveEnd( 'character', optimizationStart + counting );
                            stringWidth = rangeAgain( range, optimizationStart + counting ).boundingLeft - _TextRangeElementData.paddingLeft - _TextRangeElementData.textFieldOffsetLeft;
                            selectionEnd = counting;
                        }
                    }
                }
                linesOptimized [ linesOptimized.length ]  = _substring( optimizedText, 0, selectionEnd );
                select( selectionStart, realSelectionEnd );
            } else {
                selectionEnd = counting = optimizedText.length;
                textContent( textBeforeCaretElement, _substring( value, 0, optimizationStart + selectionEnd ) );
                textContent( textAfterCaretElement, _substring( value, optimizationStart + selectionEnd, Infinity ) );
                lastHeightOfTextPreviousToCaret = caretElement.offsetTop - textFieldClone.offsetTop;
                stringWidth = caretElement.offsetLeft - textFieldClone.offsetLeft - _TextRangeElementData.paddingLeft - _TextRangeElementData.borderLeftWidth;
                while ( counting-- > 0 ) {
                    currentCharacter = _substring( optimizedText, counting, counting + 1 );
                    var checkText = _substring( value, 0, counting ) + _substring( value, counting + 1, Infinity );
                    if ( currentCharacter == '\r' ) {
                        continue;
                    }
                    stringWidth -= charsWidth( currentCharacter );
                    if ( stringWidth <= minLineWidth ) {
                        textContent( caretElement, currentCharacter + '\u00a0' );
                        textContent( textBeforeCaretElement, _substring( checkText, 0, optimizationStart + counting ) );
                        textContent( textAfterCaretElement, _substring( checkText, optimizationStart + counting, Infinity ) );
                        heightOfTextPreviousToCaret = caretElement.offsetTop - textFieldClone.offsetTop;
                        if ( heightOfTextPreviousToCaret != lastHeightOfTextPreviousToCaret ) {
                            processedLine = _substring( optimizedText, counting + 1, selectionEnd );
                            if ( processedLine != emptyString ) {
                                linesOptimized [ linesOptimized.length ]  = processedLine;
                            }
                            selectionEnd -= processedLine.length;
                            stringWidth = caretElement.offsetLeft - textFieldClone.offsetLeft - _TextRangeElementData.paddingLeft - _TextRangeElementData.borderLeftWidth;
                            processedLine = emptyString;
                            lastHeightOfTextPreviousToCaret = heightOfTextPreviousToCaret;
                        }
                    }
                }
                if ( counting < 0 ) {
                    linesOptimized [ linesOptimized.length ]  = _substring( optimizedText, 0, selectionEnd );
                }
                removeChild( textFieldClone );
            }
            counting = 0;
            counting = linesOptimized.length - 1;
            while ( counting > -1 ) {
                lines [ lines.length ]  = linesOptimized [ counting ];
                counting--;
            }
            lines = lineBreakPosition( lines );
            singleLine = false;
        } else if ( _TextRangeElementData.isInputElement ) {
            lines [ 0 ]  = value;
        } else {
            linesOptimized = _split( value, emptyString );
            var string = emptyString;
            counting = 0;
            while ( linesOptimized [ counting ] ) {
                var line = linesOptimized [ counting ];
                string = string + line;
                if ( line == charBreakLine ) {
                    lines [ lines.length ]  = string;
                    string = emptyString;
                }
                counting++;
            }
            if ( string != emptyString ) {
                lines [ lines.length ]  = string;
            }
        }
        var checkWrap = _join( lines, emptyString );
        if ( _substring( checkWrap, checkWrap.length - 1, Infinity ) == charBreakLine && !_TextRangeElementData.isInputElement) {
            lines [ lines.length ]  = emptyString;
        }
        var linesLength = lines.length;
        var stringBeforeCaretAndAfterLine = emptyString;
        var textBeforeEnd = emptyString;
        var currentLine = linesLength - 1;
        counting = 0;
        countingCharacters = optimizationStart;
        while ( counting < linesLength ) {
            var line = lines [ counting ]  || emptyString;
            var lineLength = line.length;
            countingCharacters += lineLength;
            if ( countingCharacters > realSelectionEnd ) {
                textBeforeEnd = _substring( value, 0, countingCharacters );
                currentLine = counting;
                break;
            }
            counting++;
        }
        if ( currentLine == linesLength - 1 ) {
            textBeforeEnd = _substring( value, 0, countingCharacters );
        }
        stringBeforeCaretAndAfterLine = _substring( lines [ currentLine ], 0, lines [ currentLine ].length - ( countingCharacters - realSelectionEnd ) );
        _TextRangeElement.style.margin = currentElementMargin;
        return {
            lines: lines,
            selectionEnd: realSelectionEnd,
            currentLine: currentLine,
            textBeforeEnd: textBeforeEnd,
            stringBeforeCaretAndAfterLine: stringBeforeCaretAndAfterLine/* _substring( line, 0, textBeforeEnd.length )*/,
            optimizationStart: optimizationStart,
            currentLineEnd: textBeforeEnd.length,
            currentLineStart: countingCharacters - lineLength,
            singleLine: singleLine,
            charsList: _TextRangeElementData.charsList
        };
    }
    /*
        -------->>>>>>
    */
    /*
        --------<<<<<< Functions that gets or manipulate data from the text field element.
    */
    function updateElementData( objectRange ) {
        var element = objectRange.element ? objectRange.element : objectRange;
        if(objectRange.element){
            _ThisObjectRange = objectRange;
            element = objectRange.element;
        }
        else{
            element = objectRange;
        }
        _TextRangeElementData = new GetElementData( element );
        _TextRangeElementData.lineHeightInPX = size( '|' )[ "lineHeight" ];
    }
    function saveElementData( object ) {
        dataSavedFromTheElements[ dataSavedFromTheElements.length ] = object;
    }
    function checkDataSavedFromTheElement( element ) {
        var elementsConfigLength = dataSavedFromTheElements.length;
        var counting = elementsConfigLength;
        while ( counting-- ) {
            var elementData =  dataSavedFromTheElements[ counting ];
            if( elementData.element == element ){
                var elementCSS = getCSS( element );
                var cssProperties = cssRequired( elementCSS ) + 'display:block;' + stringHideHTMLElement;
                if( elementData.cssPropertiesOriginal == cssProperties || element.value == elementData.element.value){
                    return elementData;
                }
                else{
                    dataSavedFromTheElements.splice( counting, 1 );
                }
                break;
            }
        }
        return false;
    }
    function cssRequired( elementCSS ) {
        var counting = 0;
        var css =  [];
        while ( textFieldPropertiesCSS [ counting ] ) {
            css [ css.length ]  = textFieldPropertiesCSS [ counting ]  + ':' + elementCSS [ textFieldPropertiesJS [ counting ]  ]  + ';';
            counting++;
        }
        return _join( css, emptyString );
    }
    function normalizeBreakLine( string ) {
        return string.replace( /\r/g, emptyString );
    }
    function requiredPropertiesCSS() {
        return _split( 'direction boxSizing overflowX overflowY borderTopWidth borderRightWidth borderBottomWidth borderLeftWidth borderStyle borderColor paddingTop paddingRight paddingBottom paddingLeft fontStyle fontVariant fontWeight fontStretch fontSize fontSizeAdjust lineHeight fontFamily textAlign textTransform textIndent textDecoration letterSpacing wordSpacing tabSize mozTabSize display whiteSpace wordWrap wordBreak wordSpacing overflow color borderTopColor borderTopStyle borderLeftColor borderLeftStyle borderBottomColor borderBottomStyle borderRightColor borderRightStyle' , ' ' );
    }
    /**
     * @constructor
     */
    function GetElementData( element ) {
        var _this = this;
        var hasObjectEqual = checkDataSavedFromTheElement( element );
        if ( hasObjectEqual ) {
            return hasObjectEqual;
        }
        function paddingOrBorderX( property ) {
            var oldPropertyValue = elementStyle [ property ];
            elementStyle [ property ]  = '0';
            var value = elementOffsetWidth - element.offsetWidth;
            elementStyle [ property ]  = oldPropertyValue;
            return value;
        }
        function paddingOrBorderY( property ) {
            var oldPropertyValue = elementStyle [ property ];
            elementStyle [ property ]  = '0';
            var value = elementOffsetHeight - element.offsetHeight;
            elementStyle [ property ]  = oldPropertyValue;
            return value;
        }
        function numberOr0( value ) {
            return parseFloat( value ) || 0;
        }
        var offsetWidth = element.offsetWidth;
        var offsetHeight = element.offsetHeight;
        var elementStyle = element.style;
        var elementStyleBorderWidth = elementStyle.borderWidth;
        var elementStylePadding = elementStyle.padding;
        element.style.padding = 0;
        var elementOffsetWidth = element.offsetWidth;
        var elementOffsetHeight = element.offsetHeight;
        var elementCSS = getCSS( element );
        elementStyle = element.style;
        var borderTopWidth = paddingOrBorderY( 'borderTopWidth' ) || numberOr0( elementCSS.borderTopWidth );
        var borderLeftWidth = paddingOrBorderX( 'borderLeftWidth' ) || numberOr0( elementCSS.borderLeftWidth );
        var borderBottomWidth = paddingOrBorderY( 'borderBottomWidth' ) || numberOr0( elementCSS.borderBottomWidth );
        var borderRightWidth = paddingOrBorderX( 'borderRightWidth' ) || numberOr0( elementCSS.borderRightWidth );
        element.style.padding = elementStylePadding;
        elementCSS = getCSS( element );
        elementStyle = element.style;
        elementStyle.borderWidth = 0;
        elementOffsetWidth = element.offsetWidth;
        elementOffsetHeight = element.offsetHeight;
        var paddingTop = paddingOrBorderY( 'paddingTop' ) || numberOr0( elementCSS.paddingTop );
        var paddingLeft = paddingOrBorderX( 'paddingLeft' ) || numberOr0( elementCSS.paddingLeft );
        var paddingBottom = paddingOrBorderY( 'paddingBottom' ) || numberOr0( elementCSS.paddingBottom );
        var paddingRight = paddingOrBorderX( 'paddingRight' ) || numberOr0( elementCSS.paddingRight );
        element.style.borderWidth = elementStyleBorderWidth;
        elementCSS = getCSS( element );
        elementStyle = element.style;
        var paddingY = paddingTop + paddingBottom;
        var paddingX = paddingLeft + paddingRight;
        var elementClientWidth = element.clientWidth;
        var elementClientHeight = element.clientHeight;
        var elementStyleOverflow = elementStyle.overflow;
        elementStyle.overflow = 'hidden';
        var overflowYWidth = element.clientWidth - elementClientWidth;
        var overflowXHeight = element.clientHeight - elementClientHeight;
        elementStyle.overflow = elementStyleOverflow;
        var textFieldWidth = element.clientWidth - paddingX;
        var textFieldHeight = element.clientHeight - paddingY;
        var heightReal = element.offsetHeight - borderTopWidth - borderBottomWidth;
        var widthReal;
        var currentdoc = HTMLdoc( element );
        var cssProperties = cssRequired( elementCSS ) + 'display:block;' + stringHideHTMLElement;
        heightReal = textFieldHeight + offsetHeight - element.clientHeight - borderTopWidth - borderBottomWidth;
        widthReal = textFieldWidth + offsetWidth - element.clientWidth - borderLeftWidth - borderRightWidth - ( docMode ? 1 : 0 );
        _TextRangeElement = element;
        _this.cssPropertiesOriginal = cssProperties;
        _this.cssProperties = cssProperties + 'width:' + widthReal + 'px;height:' + heightReal + 'px;';
        _this.overflowYValue = overflowYWidth == 0 ? 'hidden' : 'scroll';
        _this.overflowXValue = overflowXHeight == 0 ? 'hidden' : 'scroll';
        _this.currentdoc = currentdoc;
        _this.body = currentdoc.body;
        _this.elementCSS = elementCSS;
        _this.elementStyle = elementStyle;
        _this.value = element.value;
        _this.borderTopWidth = borderTopWidth;
        _this.borderLeftWidth = borderLeftWidth;
        _this.borderBottomWidth = borderBottomWidth;
        _this.borderRightWidth = borderRightWidth;
        _this.paddingTop = paddingTop;
        _this.paddingLeft = paddingLeft;
        _this.paddingBottom = paddingBottom;
        _this.paddingRight = paddingRight;
        _this.paddingY = paddingY;
        _this.paddingX = paddingX;
        _this.textFieldWidth = textFieldWidth + 3;
        _this.textFieldHeight = textFieldHeight;
        _this.widthReal = widthReal;
        _this.charactersWidthForTheProcess =  [] ;
        _this.charactersWidth =  [] ;
        _this.charsList =  [] ;
        _this.knownCharacters = emptyString;
        _this.noRemove = false;
        _this.element = element;
        _this.isInputElement = tinyName( element ) == 'input';
        saveElementData( _this );
        return _this;
    }
    /*
        -------->>>>>>
    */
    /*
        --------<<<<<< Function that receives the main call of the module and prepares the return object.
    */
   /**
    * @constructor
    */
    function NewTextRangeObject( _TextFieldDataObject ) {
        var _this = this;
        if (!(_this instanceof NewTextRangeObject)) {
            return new NewTextRangeObject( _TextFieldDataObject );
        }
        _TextFieldDataObject = _TextFieldDataObject ? _TextFieldDataObject: getTextFieldData( 'line' );
        var textBeforeEnd = _TextFieldDataObject.textBeforeEnd;
        var curentlineStringWidth = size( _TextFieldDataObject.stringBeforeCaretAndAfterLine, true )[ "width" ];
        var textBeforeEndHeight;
        var charsHeight = size( textBeforeEnd )[ "charsHeight" ];
        var selectionData = getSelectionData();
        var selectionEnd = selectionData.selectionEnd;
        var selectionStart = selectionData.selectionStart;
        var value = _TextRangeElement.value;
        var currentLine = 0;
        var numberOfLines = 0;
        var textFieldContainerHeight;
        var textFieldClone = _TextRangeElement.cloneNode( false );
        var textFieldCloneStyle = textFieldClone.style;
        var caretTopPosition;
        var caretLeftPosition;
        var lineHeightInPX = _TextRangeElementData.lineHeightInPX;
        var boundingClientRect;
        var cloneScrollHeight;
        var top, left;
        if( !_TextFieldDataObject.singleLine ){
            textFieldClone.value = textBeforeEnd;
            textFieldCloneStyle.visibility = 'hidden';
            textFieldCloneStyle.position = 'absolute';
            textFieldCloneStyle.padding = '0';
            textFieldCloneStyle.overflowX = _TextRangeElementData.overflowXValue;
            textFieldCloneStyle.overflowY = _TextRangeElementData.overflowYValue;
            appendChild( parentElement( _TextRangeElement ), textFieldClone );
            textFieldCloneStyle.height = lineHeightInPX + 'px';
            textFieldClone.scrollTop = 50/* force the internet explore recognize the real value of scrollHeight*/;
            cloneScrollHeight = textFieldClone.scrollHeight - lineHeightInPX;
            currentLine = Math.abs( parseInt( cloneScrollHeight / lineHeightInPX ) );
            //currentLine = docMode ? currentLine: currentLine--;
            select( selectionStart, selectionEnd );
            textFieldClone.value = value;
            numberOfLines = parseInt( ( textFieldClone.scrollHeight - _TextRangeElementData.paddingY ) / lineHeightInPX );
            removeChild( textFieldClone );
        }
        textFieldContainerHeight = _TextRangeElementData.textFieldHeight;
        textBeforeEndHeight = ( currentLine  ) * lineHeightInPX + _TextRangeElementData.paddingTop;
        if ( _TextRangeElement.getBoundingClientRect ) {
            boundingClientRect = _TextRangeElement.getBoundingClientRect();
        } else {
            boundingClientRect = {
                top: 0,
                left: 0
            };
        }
        _TextRangeElement.scrollTop = textFieldContainerHeight + _TextRangeElementData.paddingY - textBeforeEndHeight;
        var elementScrollTop = ( textBeforeEndHeight + _TextRangeElementData.paddingBottom ) - _TextRangeElementData.textFieldHeight;
        var elementScrollLeft;
        _TextRangeElement.scrollTop = elementScrollTop;
        _TextRangeElement.scrollLeft = curentlineStringWidth - _TextRangeElementData.textFieldWidth;
        elementScrollTop = _TextRangeElement.scrollTop;
        elementScrollLeft = _TextRangeElement.scrollLeft;
        selectionData = getSelectionData();
        caretTopPosition = textBeforeEndHeight - elementScrollTop - _TextRangeElementData.paddingTop;
        caretLeftPosition = curentlineStringWidth - elementScrollLeft;
        top =  caretTopPosition;
        left = caretLeftPosition;
        
        _this['element']= _TextRangeElement;
        _this['charBreak']= breakLineDefault;
        _this['top']= top;
        _this['left']= left;
        _this['x']= left;
        _this['y']= top;
        _this['offsetTop']= caretTopPosition + elementScrollTop + _TextRangeElementData.paddingTop;
        _this['offsetLeft']= curentlineStringWidth + elementScrollLeft + _TextRangeElementData.paddingLeft;
        _this['viewTop']= top + _TextRangeElementData.paddingTop + boundingClientRect.top + _TextRangeElementData.borderTopWidth;
        _this['viewLeft']= left + _TextRangeElementData.paddingLeft + boundingClientRect.left + _TextRangeElementData.borderLeftWidth;
        _this['lineHeight']= _TextRangeElementData.lineHeightInPX;
        _this['borderWidth']= {
            'top': _TextRangeElementData.borderTopWidth,
            'left': _TextRangeElementData.borderLeftWidth,
            'bottom': _TextRangeElementData.borderBottomWidth,
            'right': _TextRangeElementData.borderRightWidth
        };
        _this['padding']= {
            'top':_TextRangeElementData.paddingTop,
            'left': _TextRangeElementData.paddingLeft,
            'bottom': _TextRangeElementData.paddingBottom,
            'right': _TextRangeElementData.paddingRight
        };
        _this['charsHeight']= charsHeight;
        _this['charsWidth']= _TextRangeElementData.charactersWidth;
        _this['charsList']= _TextFieldDataObject.charsList;
        _this['textFieldHeight']= _TextRangeElementData.textFieldHeight;
        _this['textFieldWidth']= _TextRangeElementData.textFieldWidth;
        _this['currentLine']= currentLine;
        _this['currentLineText']= _substring(value, _TextFieldDataObject.currentLineStart, _TextFieldDataObject.currentLineEnd ) ;
        _this['currentLineStart']= _TextFieldDataObject.currentLineStart;
        _this['currentLineEnd']= _TextFieldDataObject.currentLineEnd;
        _this['afterSelection']= selectionData.afterSelection;
        _this['beforeSelection']= selectionData.beforeSelection;
        _this['selection']= selectionData.selectionText;
        _this['selectionStart']= selectionStart;
        _this['selectionEnd']= selectionEnd;
        _this['numberOfLines']= numberOfLines;
        
        if( _ThisObjectRange ){
            var property;
            for ( property in _this ) {
                _ThisObjectRange[ property ] = _this[ property ];
            }
        }
        return _this;
    }

    NewTextRangeObject.prototype = {
        'breakLines': breakLines,
        'lines': getLines,
        'size': stringSize,
        'moveCaret': moveCaret,
        'select': selectText,
        'replaceSelection': replaceSelection,
        'insert': insert,
        'setCaret': setCaret,
        'appendString': appendString,
        'findString': findString,
        'refresh': refresh
    }
    /*
        -------->>>>>>
    */
    /*
        --------<<<<<< Global object, inserting methods and properties.
    */
    
    function textFieldRange( element ) {
        updateElementData( element );
        return  NewTextRangeObject();
    }
    if ('undefined' !== typeof module && 'undefined' !== typeof module['exports']) {
        module['exports'] = textFieldRange;
    } 
    else if( typeof define === "function" && define.amd ){
        define("textFieldRange", [], function() {
            return textFieldRange; 
        });
    }
    else {
        global['textFieldRange'] = textFieldRange;
    } 
    /*
        -------->>>>>>
    */
  } )( 'undefined' != typeof window ? window : this, document, Infinity);