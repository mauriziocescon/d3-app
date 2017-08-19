import "babel-polyfill";
import "d3";
import "jquery";
import "popper.js";

/* tslint:disable:no-string-literal */
import * as $ from "jquery";
window["$"] = window["jQuery"] = $; // jQuery is global for other objs
/* tslint:enable:no-string-literal */

// Take a look at http://thesassway.com/beginner/how-to-structure-a-sass-project
// for more information

import "./assets/stylesheets/all";
