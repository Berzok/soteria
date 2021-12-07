var Neutralino = function (e) {
    "use strict";

    function n(e, n) {
        return new Promise(((t, o) => {
            let r = new CustomEvent(e, {detail: n});
            window.dispatchEvent(r), t()
        }))
    }

    var t = Object.freeze({
        __proto__: null,
        on: function (e, n) {
            return new Promise(((t, o) => {
                window.addEventListener(e, n), t()
            }))
        },
        off: function (e, n) {
            return new Promise(((t, o) => {
                window.removeEventListener(e, n), t()
            }))
        },
        dispatch: n
    });
    let o, r = {};

    function i(e, t) {
        return new Promise(((i, u) => {
            if (o.readyState != WebSocket.OPEN) {
                let e = {
                    code: "NE_CL_NSEROFF",
                    message: "Neutralino server is offline. Try restarting the application"
                };
                return n("serverOffline", e), u(e)
            }
            const a = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (e => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16))),
                s = window.NL_TOKEN;
            r[a] = {
                resolve: i,
                reject: u
            }, o.send(JSON.stringify({
                id: a,
                method: e,
                data: t,
                accessToken: s
            }))
        }))
    }

    var u, a, s = Object.freeze({
        __proto__: null,
        createDirectory: function (e) {
            return i("filesystem.createDirectory", {path: e})
        },
        removeDirectory: function (e) {
            return i("filesystem.removeDirectory", {path: e})
        },
        writeFile: function (e, n) {
            return i("filesystem.writeFile", {
                path: e,
                data: n
            })
        },
        writeBinaryFile: function (e, n) {
            let t = new Uint8Array(n), o = "";
            for (let e of t) o += String.fromCharCode(e);
            return i("filesystem.writeBinaryFile", {
                path: e,
                data: window.btoa(o)
            })
        },
        readFile: function (e) {
            return i("filesystem.readFile", {path: e})
        },
        readBinaryFile: function (e) {
            return new Promise(((n, t) => {
                i("filesystem.readBinaryFile", {path: e}).then((e => {
                    let t = window.atob(e), o = t.length, r = new Uint8Array(o);
                    for (let e = 0; e < o; e++) r[e] = t.charCodeAt(e);
                    n(r.buffer)
                })).catch((e => {
                    t(e)
                }))
            }))
        },
        removeFile: function (e) {
            return i("filesystem.removeFile", {path: e})
        },
        readDirectory: function (e) {
            return i("filesystem.readDirectory", {path: e})
        },
        copyFile: function (e, n) {
            return i("filesystem.copyFile", {
                source: e,
                destination: n
            })
        },
        moveFile: function (e, n) {
            return i("filesystem.moveFile", {
                source: e,
                destination: n
            })
        },
        getStats: function (e) {
            return i("filesystem.getStats", {path: e})
        }
    });
    !function (e) {
        e.WARNING = "WARNING", e.ERROR = "ERROR", e.INFO = "INFO", e.QUESTION = "QUESTION"
    }(u || (u = {})), function (e) {
        e.OK = "OK", e.OK_CANCEL = "OK_CANCEL", e.YES_NO = "YES_NO", e.YES_NO_CANCEL = "YES_NO_CANCEL", e.RETRY_CANCEL = "RETRY_CANCEL", e.ABORT_RETRY_IGNORE = "ABORT_RETRY_IGNORE"
    }(a || (a = {}));
    var c = Object.freeze({
        __proto__: null,
        get Icon() {
            return u
        },
        get MessageBoxChoice() {
            return a
        },
        execCommand: function (e, n) {
            return i("os.execCommand", Object.assign({command: e}, n))
        },
        getEnv: function (e) {
            return i("os.getEnv", {key: e})
        },
        showOpenDialog: function (e, n) {
            return i("os.showOpenDialog", Object.assign({title: e}, n))
        },
        showFolderDialog: function (e) {
            return i("os.showFolderDialog", {title: e})
        },
        showSaveDialog: function (e, n) {
            return i("os.showSaveDialog", Object.assign({title: e}, n))
        },
        showNotification: function (e, n, t) {
            return i("os.showNotification", {
                title: e,
                content: n,
                icon: t
            })
        },
        showMessageBox: function (e, n, t, o) {
            return i("os.showMessageBox", {
                title: e,
                content: n,
                choice: t,
                icon: o
            })
        },
        setTray: function (e) {
            return i("os.setTray", e)
        },
        open: function (e) {
            return i("os.open", {url: e})
        },
        getPath: function (e) {
            return i("os.getPath", {name: e})
        }
    });
    var l = Object.freeze({
        __proto__: null,
        getMemoryInfo: function () {
            return i("computer.getMemoryInfo")
        }
    });
    var d, f = Object.freeze({
        __proto__: null,
        setData: function (e, n) {
            return i("storage.setData", {
                key: e,
                data: n
            })
        },
        getData: function (e) {
            return i("storage.getData", {key: e})
        }
    });
    !function (e) {
        e.WARNING = "WARNING", e.ERROR = "ERROR", e.INFO = "INFO"
    }(d || (d = {}));
    var w = Object.freeze({
        __proto__: null,
        get LoggerType() {
            return d
        },
        log: function (e, n) {
            return i("debug.log", {
                message: e,
                type: n
            })
        }
    });

    function m(e, n, t, o) {
        return new (t || (t = Promise))((function (r, i) {
            function u(e) {
                try {
                    s(o.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    s(o.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                var n;
                e.done ? r(e.value) : (n = e.value, n instanceof t ? n : new t((function (e) {
                    e(n)
                }))).then(u, a)
            }

            s((o = o.apply(e, n || [])).next())
        }))
    }

    function p() {
        return i("app.keepAlive")
    }

    var v = Object.freeze({
        __proto__: null,
        exit: function (e) {
            return i("app.exit", {code: e})
        },
        killProcess: function () {
            return i("app.killProcess")
        },
        restartProcess: function (e) {
            return new Promise(((n, t) => m(this, void 0, void 0, (function* () {
                let t = window.NL_ARGS.reduce(((e, n, t) => e += " " + n), "");
                (null == e ? void 0 : e.args) && (t += " " + e.args), yield Neutralino.os.execCommand(t, {shouldRunInBackground: !0}), Neutralino.app.exit(), n()
            }))))
        },
        keepAlive: p,
        getConfig: function () {
            return i("app.getConfig")
        }
    });
    var g = Object.freeze({
        __proto__: null,
        setTitle: function (e) {
            return i("window.setTitle", {title: e})
        },
        maximize: function () {
            return i("window.maximize")
        },
        unmaximize: function () {
            return i("window.unmaximize")
        },
        isMaximized: function () {
            return i("window.isMaximized")
        },
        minimize: function () {
            return i("window.minimize")
        },
        setFullScreen: function () {
            return i("window.setFullScreen")
        },
        exitFullScreen: function () {
            return i("window.exitFullScreen")
        },
        isFullScreen: function () {
            return i("window.isFullScreen")
        },
        show: function () {
            return i("window.show")
        },
        hide: function () {
            return i("window.hide")
        },
        isVisible: function () {
            return i("window.isVisible")
        },
        focus: function () {
            return i("window.focus")
        },
        setIcon: function (e) {
            return i("window.setIcon", {icon: e})
        },
        move: function (e, n) {
            return i("window.move", {
                x: e,
                y: n
            })
        },
        setDraggableRegion: function (e) {
            return new Promise(((n, t) => {
                let o = document.getElementById(e), r = 0, i = 0;

                function u(e) {
                    return m(this, void 0, void 0, (function* () {
                        yield Neutralino.window.move(e.screenX - r, e.screenY - i)
                    }))
                }

                o || t(`Unable to find dom element: #${e}`), o.addEventListener("pointerdown", (e => {
                    r = e.clientX, i = e.clientY, o.addEventListener("pointermove", u), o.setPointerCapture(e.pointerId)
                })), o.addEventListener("pointerup", (e => {
                    o.removeEventListener("pointermove", u), o.releasePointerCapture(e.pointerId)
                })), n()
            }))
        },
        setSize: function (e) {
            return i("window.setSize", e)
        },
        create: function (e, n) {
            return new Promise(((t, o) => {
                function r(e) {
                    return "string" != typeof e || (e = e.trim()).includes(" ") && (e = `"${e}"`), e
                }

                let i = window.NL_ARGS.reduce(((e, n, t) => ((n.includes("--path=") || n.includes("--debug-mode") || n.includes("--load-dir-res") || 0 == t) && (e += " " + r(n)), e)), "");
                i += " --url=" + r(e);
                for (let e in n) {
                    if ("processArgs" == e) continue;
                    i += ` --window${e.replace(/[A-Z]|^[a-z]/g, (e => "-" + e.toLowerCase()))}=${r(n[e])}`
                }
                n && n.processArgs && (i += " " + n.processArgs), Neutralino.os.execCommand(i, {shouldRunInBackground: !0}).then((() => {
                    t()
                })).catch((e => {
                    o(e)
                }))
            }))
        }
    });

    function h() {
        setInterval((() => m(this, void 0, void 0, (function* () {
            try {
                let e = yield fetch("http://localhost:5050");
                JSON.parse(yield e.text()).needsReload && location.reload()
            } catch (e) {
                console.error("Unable to communicate with neu devServer")
            }
        }))), 1e3)
    }

    return e.app = v, e.computer = l, e.debug = w, e.events = t, e.filesystem = s, e.init = function () {
        if (o = new WebSocket(`ws://${window.location.hostname}:${window.NL_PORT}`), o.addEventListener("message", (e => {
            var t, o;
            const i = JSON.parse(e.data);
            i.id && i.id in r ? ((null === (t = i.data) || void 0 === t ? void 0 : t.error) ? r[i.id].reject(i.data.error) : (null === (o = i.data) || void 0 === o ? void 0 : o.success) && r[i.id].resolve(i.data.hasOwnProperty("returnValue") ? i.data.returnValue : i.data), delete r[i.id]) : i.event && n(i.event, i.data)
        })), o.addEventListener("open", (e => {
            n("ready")
        })), window.NL_MODE && "browser" == window.NL_MODE && function () {
            setInterval((() => m(this, void 0, void 0, (function* () {
                try {
                    yield p()
                } catch (e) {
                    console.error("Unable to keep Neutralino server online. The server is not reachable.")
                }
            }))), 5e3)
        }(), void 0 !== window.NL_ARGS) for (let e = 0; e < window.NL_ARGS.length; e++) if ("--debug-mode" == window.NL_ARGS[e]) {
            h();
            break
        }
        window.NL_CVERSION = "2.0.0"
    }, e.os = c, e.storage = f, e.window = g, Object.defineProperty(e, "__esModule", {value: !0}), e
}({});
