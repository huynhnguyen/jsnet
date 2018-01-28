(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("skynet", [], factory);
	else if(typeof exports === 'object')
		exports["skynet"] = factory();
	else
		root["skynet"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdateskynet"];
/******/ 	this["webpackHotUpdateskynet"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "hot/hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "hot/hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "af46c6c32bcc4b700633"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(4)(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const nd = __webpack_require__(1);

const Selector = {
  get: function (d, selectString) {
    let value = d.v,
        shape = d.sh,
        space = d.sp;
    let selector = nd.remapSelect(selectString, shape);
    let shapeNew = selector.map(d => d[2] ? 0 | (d[1] - d[0]) / d[2] : null).filter(d => d);

    let valueNew = new Float32Array(nd.getVolume(shapeNew));
    // console.warn('get',selectString, selector, shapeNew)
    for (let [px, c] of nd.enummerate(nd.indexGenerator(selector, nd.getSpace(shape)))) {
      const idx = px.idx,
            vx = px.vx;
      // console.warn(idx, vx);
      valueNew[c] = value[vx];
    }
    return new number(valueNew, shapeNew);
  },
  set: function (d, selectString, newValue) {
    let value = d.v,
        shape = d.sh,
        space = d.sp;
    const selector = nd.remapSelect(selectString, shape);
    const getAtFunc = newValue => {
      if (typeof newValue === 'number') {
        return { getAt: counter => newValue };
      }
      if (newValue instanceof Array) {
        //TODO: implement check shape
        let valueFlatten = nd.ravel(newValue);
        return { getAt: counter => valueFlatten[counter] };
      }
      if (newValue.type === 'Number') {
        //TODO: implement check shape
        let v = newValue.value;
        return { getAt: counter => v[counter] };
      }
    };
    const func = getAtFunc(newValue);
    for (let [px, c] of nd.enummerate(nd.indexGenerator(selector, space))) {
      let idx = px.idx,
          vx = px.vx;
      value[vx] = func.getAt(c);
    }
    return d;
  }
};
function number(value, shape) {
  if (shape) {
    this.shape = nd.clone(shape);
    this.volume = nd.getVolume(this.shape);
    this.space = nd.getSpace(this.shape);
    this.value = value;
  } else if (value) {
    const _shape = nd.getShape(value);
    this.shape = nd.clone(_shape);
    this.volume = nd.getVolume(this.shape);
    this.space = nd.getSpace(this.shape);
    this.value = new Float32Array(this.volume);
    const selector = this.shape.map(d => [0, d, 1]);
    for (let [px, c] of nd.enummerate(nd.indexGenerator(selector, this.space))) {
      let idx = px.idx,
          vx = px.vx;
      this.value[c] = idx.reduce((v, i) => v[i], value);
    }
  } else {
    //TODO: this is op instance
    this.grad = null;
  }
  this.type = 'Number';
  this.v = new Proxy({ v: this.value, sh: this.shape, sp: this.space }, Selector);
}

function Number(value, shape) {
  return new number(value, shape);
}

if (true) {
  module.exports = Number;
}
if (typeof window !== 'undefined') {
  window.Number = Number;
}

number.prototype.isNumber = nd => {
  return nd.type === 'Number' ? true : false;
};

number.prototype.reshape = function (newShape) {
  const newVolume = nd.getVolume(newShape);
  if (newVolume !== this.volume) {
    throw Error('shape is not consistent');
  }
  return new number(this.value, newShape);
};

number.prototype.tolist = function () {
  let list = this.shape.slice().reverse().reduce((l, s) => {
    let ll = l.reduce((d, v) => {
      d.tmp.push(v);
      if (d.tmp.length === s) {
        d.t.push(d.tmp);
        d.tmp = [];
      }
      return d;
    }, { t: [], tmp: [] });
    return ll.t;
  }, this.value)[0];
  return list;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const getShape = arr => typeof arr === 'number' ? null : [arr.length].concat(getShape(arr[0])).filter(d => d);

const getSpace = shape => shape.length == 0 ? 1 : shape.reduceRight((ss, d, i, shape) => i == shape.length - 1 ? [1] : [ss[0] * shape[i + 1], ...ss], []);

// shape = [4,3,4];
// console.log(getSpace(shape));

const getVolume = shape => shape.length == 0 ? [] : shape.reduce((a, b) => a * b);

const clone = refValue => {
  return refValue instanceof Array ? Object.assign([], refValue) : Object.assign({}, refValue);
};

const remapIndex = (idx, sh) => {
  idx = idx > -1 ? idx : sh + idx;
  if (idx < 0 || idx >= sh) {
    throw Error('index invalid');
  } else {
    return idx;
  }
};

const remapSelect = (sval, shape) => {
  //numpy like selector
  const vsp = sval.split(',');
  if (vsp.length > shape.length) {
    throw Error('selector is not consitent with shape');
  }
  const select = shape.map((sh, i) => {
    const v = i < vsp.length ? vsp[i] : ':';
    if ('' + +v === 'NaN') {
      //check if v is a number or not
      let [l, h, st] = v.split(':');
      st = st ? +st : 1;
      l = l ? +l : st > 0 ? 0 : sh - 1;
      h = h ? +h : st > 0 ? sh : 0;
      let check = [];
      check.push(h > sh ? `IndexError: ${h} higher than ${sh}` : null);
      check.push(st < 0 && h > l ? `IndexError: if st < 0, ${l} higher than ${h}` : null);
      if (check.filter(d => d).length) {
        throw Error('' + check);
      }
      return [l, h, st];
    } else {
      return remapIndex(+v, sh);
    }
  });
  return select;
};

function* indexGenerator(selector, space, axis, idx) {
  axis = axis | 0;
  idx = idx ? idx : selector.map(() => 0);
  const l = selector[axis][0] | selector[axis],
        h = selector[axis][1] ? selector[axis][1] : l + 1,
        s = selector[axis][2] ? selector[axis][2] : 1;
  idx[axis] = l;
  while (s > 0 ? idx[axis] < h : false) {
    if (axis + 1 < selector.length) {
      yield* indexGenerator(selector, space, axis + 1, idx);
      idx[axis] += s;
    } else {
      yield { idx: idx, vx: idx.reduce((s, d, i) => s + d * space[i], 0) };
      idx[axis] += s;
    }
  }
}

function* _indexGenerator(_selector, space, axis, idx) {
  let [l, h, s] = _selector;
  while (l < h) {
    idx[axis] = l;
    yield { idx: idx, vx: idx.reduce((s, d, i) => s + d * space[i], 0) };
    l += s;
  }
}

function* enummerate(generator) {
  let i = 0;
  for (let v of generator) {
    yield [v, i];
    i += 1;
  }
}

const ravel = a => a.reduce((s, a) => {
  return a instanceof Array ? s.concat(ravel(a)) : s.concat(a);
}, []);

const ndarray = {
  'getShape': getShape,
  'getSpace': getSpace,
  'getVolume': getVolume,
  'clone': clone,
  'remapSelect': remapSelect,
  'indexGenerator': indexGenerator,
  '_indexGenerator': _indexGenerator,
  'enummerate': enummerate,
  'ravel': ravel
};
module.exports = ndarray;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const nd = __webpack_require__(1);
const GradOps = __webpack_require__(3);
const Number = __webpack_require__(0);

const Operators = {};

if (true) {
  module.exports = Operators;
}
if (typeof window !== 'undefined') {
  window.Operators = Operators;
}

Operators.dot = (nbA, nbB, stopGrad, prefix) => {
  stopGrad = stopGrad ? stopGrad : false;
  const _dot$1d = (sA, sB, nS) => {
    let newShape = [1],
        newValue = new Float32Array(1);
    for (let v = 0; v < nS; v++) {
      newValue[0] += nbA.value[v] * nbB.value[v];
    }
    return Number(newValue, newShape);
  };
  const _dot$2d = (sA, sB, nS, pA, pB) => {
    let newShape = [sA[0], sB[1]];
    let newValue = new Float32Array(nd.getVolume(newShape));
    const selector = newShape.map(d => [0, d, 1]);
    for (let px of nd.indexGenerator(selector, nd.getSpace(newShape))) {
      let aVx = 0,
          bVx = 0,
          vx = px.vx,
          r = px.idx[0],
          c = px.idx[1];
      for (let v = 0; v < nS; v += 1) {
        aVx = r * pA[0] + v;
        bVx = c + v * pB[0];
        newValue[vx] += nbA.value[aVx] * nbB.value[bVx];
      }
    }
    return Number(newValue, newShape);
  };
  const _checkShapeThenRun = (ndA, ndB) => {
    const sA = nbA.shape,
          sB = nbB.shape;
    const pA = nbA.space,
          pB = nbB.space;
    if (sA.length == 1 && sB.length == 1) {
      const nS = sA[0] === sB[0] ? sA[0] : null;
      if (nS === null) {
        throw Error('shape not consitent');
      }
      return _dot$1d(sA, sB, nS);
    } else if (sA.length == 2 && sA.length == 2) {
      const nS = sA[1] === sB[0] ? sA[1] : null;
      return _dot$2d(sA, sB, nS, pA, pB);
    } else if (sA.length > 2 && sB.length == 2) {
      const sA$l = sA.length;
      const nS = sA[sA$l - 1] === sB[0] ? sA[sA$l - 1] : null;
      if (nS === null) {
        throw Error('shape not consitent');
      }
      let newShape = [...sA.slice(0, -1), sB[1]];
      let newValue = new Float32Array(nd.getVolume(newShape));
      let ret = Number(newValue, newShape);
      console.log('newShape', newShape);
      let selector = sA.map((d, i) => i < sA$l - 2 ? [0, d, 1] : d);
      let leftSelect;
      for (let px of nd.indexGenerator(selector, sA)) {
        leftSelect = px.idx.slice(0, -2).join(',') + ',:,:';
        // console.warn('loop', leftSelect);
        // console.warn(ndA.v[leftSelect]);
        let _innerRet = Operators.dot(ndA.v[leftSelect], ndB);
        // console.warn(_innerRet);
        ret.v[leftSelect] = _innerRet;
      }
      return ret;
    } else if (sA.length > 2 && sB.length > 2) {
      const sA$l = sA.length,
            sB$l = sB.length;
      const nS = sA[sA$l - 1] === sB[sB$l - 2] ? sA[sA$l - 1] : null;
      if (nS === null) {
        throw Error('shape not consitent');
      }
      let newShape = [...sA.slice(0, -1), ...sB.slice(0, -2), ...sB.slice(-1)];
      let newValue = new Float32Array(nd.getVolume(newShape));
      let ret = Number(newValue, newShape);
      console.log('newShape', newShape);
      let leftSelector = sA.map((d, i) => i < sA$l - 2 ? [0, d, 1] : d);
      let rightSelector = sB.map((d, i) => i < sB$l - 2 ? [0, d, 1] : d);
      let leftSelect, rightSelect, select;
      for (let lpx of nd.indexGenerator(leftSelector, sA)) {
        leftSelect = lpx.idx.slice(0, -2).join(',');
        for (let rpx of nd.indexGenerator(rightSelector, sB)) {
          rightSelect = rpx.idx.slice(0, -2).join(',');
          select = leftSelect + ',:,' + rightSelect + ',:';
          // console.warn('loop', leftSelect, rightSelect, select);  
          let _innerRet = Operators.dot(ndA.v[leftSelect], ndB.v[rightSelect]);
          // console.warn(_innerRet);
          ret.v[select] = _innerRet;
        }
      }
      return ret;
    } else {
      throw Error('shape not consitent');
    }
  };

  let ret = _checkShapeThenRun(nbA, nbB);

  if (stopGrad === false && GradOps.dot) {
    // console.warn('go there')
    ret = GradOps.dot(ret, [nbA, nbB]);
  }
  return ret;
};

Operators.T = (nbA, stopGrad) => {
  // validateDotShape(a.shape,b.shape);
  stopGrad = stopGrad ? stopGrad : false;
  const sA = nbA.shape,
        space = nbA.space;
  let newShape = sA.slice().reverse();
  let newValue = new Float32Array(nd.getVolume(newShape));
  const selector = newShape.map(d => [0, d, 1]);
  for (let px of nd.indexGenerator(selector, nd.getSpace(newShape))) {
    const idx = px.idx,
          vx = px.vx;
    const rvx = idx.slice().reverse().reduce((s, d, i) => s + d * space[i], 0);
    newValue[vx] = nbA.value[rvx];
  }
  return Number(newValue, newShape);
};

Operators.pow = (nd, hat, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  let newValue = nd.value.map(d => Math.pow(d, hat));
  let ret = Number(newValue, nd.shape);
  if (stopGrad === false && GradOps.pow) {
    ret = GradOps.pow(ret, nd, hat);
  }
  console.warn(ret);
  return ret;
};

Operators.exp = (nd, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  let newValue = nd.value.map(d => Math.exp(d));
  let ret = Number(newValue, nd.shape);
  if (nd.grad) {
    ret.grad = [{ father: nd.grad,
      vjp_op: x => Math.exp(x) }];
  }
  return ret;
};

Operators.tanh = (nd, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  let newValue = nd.value.map(d => Math.tanh(d));
  let ret = Number(newValue, nd.shape);
  if (GradOps.tanh) {
    ret = GradOps.tanh(ret, nd);
  }
  return ret;
};

Operators.sigmoid = (nd, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  let newValue = nd.value.map(d => 0.5 * (Math.tanh(d) + 1.0));

  return Number(newValue, nd.shape);
};

Operators.relu = (nd, stopGrad) => {
  throw Error('not implement');
};

const validateOps = (nbA, valB) => {
  const vecMapping = (ndA, ndB, ops) => {
    let vA = ndA.value,
        vB = ndB.value;
    return vA.map((d, i) => ops(vA[i], vB[i]));
  };

  const numMapping = (ndA, vB, ops) => {
    let vA = ndA.value;
    return vA.map((d, i) => ops(d, vB));
  };
  // console.warn(typeof nbA, typeof valB);
  if (Number().isNumber(nbA) && typeof valB === 'number') {
    return numMapping;
  }
  if (Number().isNumber(nbA) && Number().isNumber(valB)) {
    return vecMapping;
  }
  throw Error('invalide object type');
};

Operators.add = (a, b, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  const addOp = (d1, d2) => d1 + d2;
  const mapping = validateOps(a, b);
  let newValue = mapping(a, b, addOp);
  let ret = Number(newValue, a.shape);
  if (stopGrad === false && GradOps.add) {
    ret = GradOps.add(ret, [a, b]);
  }
  return ret;
};

Operators.minus = (a, b, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  const minusOp = (d1, d2) => d1 - d2;
  const mapping = validateOps(a, b);
  let newValue = mapping(a, b, minusOp);
  let ret = Number(newValue, a.shape);
  if (stopGrad === false && GradOps.minus) {
    ret = GradOps.minus(ret, [a, b]);
  }
  return ret;
};

Operators.mul = (a, b, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  const mulOp = (d1, d2) => d1 * d2;
  const mapping = validateOps(a, b);
  let newValue = mapping(a, b, mulOp);
  return Number(newValue, a.shape);
};

Operators.div = (a, b, stopGrad) => {
  stopGrad = stopGrad ? stopGrad : false;
  const divOp = (d1, d2) => d1 / d2;
  const mapping = validateOps(a, b);
  let newValue = mapping(a, b, divOp);
  return Number(newValue, a.shape);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Number = __webpack_require__(0);
const GradOps = {};
if (true) {
		module.exports = GradOps;
}
if (typeof window !== 'undefined') {
		window.GradOps = GradOps;
}

GradOps.tanh = (ret, nd) => {
		if (nd.grad) {
				const vjp_op = x => 1 - Math.pow(Math.tanh(x), 2);
				ret.grad = [{ bw: nd, vid: nd.grad[0].vid, elementWise: true,
						vjp: Number(nd.value.map(d => vjp_op(d)), nd.shape) }];
		}
		return ret;
};

GradOps.add = (ret, nds) => {
		ret.grad = nds.map((nd, i) => {
				if (nd.grad) {
						return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
								vjp: Number(nd.value.map(d => 1), nd.shape) };
				}
		}).filter(d => d);
		return ret;
};

GradOps.minus = (ret, nds) => {
		ret.grad = nds.map((nd, i) => {
				if (nd.grad && i == 0) {
						return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
								vjp: Number(nd.value.map(d => 1), nd.shape) };
				}
				if (nd.grad && i == 1) {
						return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
								vjp: Number(nd.value.map(d => -1), nd.shape) };
				}
		}).filter(d => d);
		return ret;
};

GradOps.dot = (ret, nds) => {
		let [nd$0, nd$1] = nds;
		ret.grad = nds.map((nd, i) => {
				if (nd.grad) {
						if (i == 0) {
								return { bw: nd, vid: nd.grad[0].vid, vjp: nd$1,
										elementWise: false, order: i };
						} else {
								return { bw: nd, vid: nd.grad[0].vid, vjp: nd$0,
										elementWise: false, order: i };
						}
				}
		}).filter(d => d);
		return ret;
};

GradOps.pow = (ret, nd, hat) => {
		// console.warn('GradOps.pow', hat);
		// console.warn(nd);
		if (nd.grad) {
				const vjp_op = x => hat * x;
				ret.grad = [{ bw: nd, vid: nd.grad[0].vid, elementWise: true,
						vjp: Number(nd.value.map(d => vjp_op(d)), nd.shape) }];
		}
		return ret;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const nd = __webpack_require__(1);
const Ops = __webpack_require__(2);
const Number = __webpack_require__(0);

const deepClone = data => data ? JSON.parse(JSON.stringify(data)) : null;

const Autograd = {};

if (true) {
  module.exports = Autograd;
}
if (typeof window !== 'undefined') {
  window.Autograd = Autograd;
}

const NoGrad = true;

const backward = (nd$child, nd$pDiff, debug) => {
  const grad = nd$child.grad;

  if (debug) {
    console.warn('backward', debug);
    console.table(debug);
    console.warn(grad);
    debug.level += 1;
  }
  if (grad == null) {
    return nd$pDiff;
  } else {
    let _grad = grad.map(g => {
      if (g === false) {
        return null;
      }
      if (g.bw === null || g.vjp === null) {
        nd$pDiff.vid = g.vid;
        return nd$pDiff;
      } else {
        console.warn(Ops.T(g.vjp).shape, nd$pDiff.shape);
        // let nd$diff = Ops.dot(Ops.T(nd$pDiff),g.vjp, NoGrad);
        let nd$diff;
        if (g.elementWise) {
          nd$diff = Ops.mul(nd$pDiff, g.vjp, NoGrad);
        } else {
          if (g.order == 0) {
            nd$diff = Ops.dot(nd$pDiff, Ops.T(g.vjp), NoGrad);
          } else {
            nd$diff = Ops.dot(Ops.T(g.vjp), nd$pDiff, NoGrad);
          }
        }

        return backward(g.bw, nd$diff, deepClone(debug));
      }
    }).filter(d => d).reduce((ss, d) => {
      if (d.length) {
        return [...ss, ...d];
      } else {
        return [...ss, d];
      }
    }, []);
    return _grad;
  }
};

Autograd.grad = function (func) {
  const wrapper = (...inputs) => {
    for (let [nd$0, c] of nd.enummerate(inputs)) {
      if (Number().isNumber(nd$0) && nd$0.grad !== false) {
        nd$0.grad = [{ vid: c, bw: null, vjp: null }];
      }
    }
    let nd$ret = func(...inputs);
    //reset value to 1
    nd$ret.value = nd$ret.value.map(d => 1);

    let debug = { level: 0 };
    let _nds$grad = backward(nd$ret, nd$ret, debug);
    let _nds$gradSum = _nds$grad.reduce((ss, g) => {
      const _vid = g.vid;
      // console.warn(_vid, ss[_vid]);
      if (ss[_vid]) {
        ss[_vid] = Ops.add(ss[_vid], g, NoGrad);
      } else {
        ss[_vid] = g;
      }
      return ss;
    }, {});
    let nds$grad = Object.values(_nds$gradSum);
    // console.table( nds$grad );
    return [nds$grad, nd$ret];
  };
  return wrapper;
};

Autograd.backward = backward;

/***/ })
/******/ ]);
});
//# sourceMappingURL=autograd.js.map