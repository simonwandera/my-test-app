import React, { useEffect, useState } from 'react'
import { isChrome, isEdge, isFirefox, isIE, isMobile, isOpera, isSafari, isYandex } from 'react-device-detect';


const UseBrowser = () => {
    const [browser, setBrowser] = useState()
    useEffect(() => {
        if (isChrome) {
            setBrowser('Chrome')
        } else
            if (isFirefox) {
                setBrowser("Firefox")
            } else
                if (isSafari) {
                    setBrowser("Firefox")
                } else
                    if (isOpera) {
                        setBrowser("Opera")
                    } else
                        if (isIE) {
                            setBrowser('IE')
                        } else
                            if (isEdge) {
                                setBrowser('Edge')
                            } else
                                if (isYandex) {
                                    setBrowser('Yandex')
                                } else
                                    setBrowser('Unknown Browser')

    }, [])
    return browser
}

export default UseBrowser
