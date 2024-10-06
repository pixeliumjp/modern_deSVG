// SVGをインラインに置き換える関数
export const deSVG = (selector, removeInlineCss = false) => {
    const sortImages = {};

    // SVGファイルをロード
    const loadSvg = async (imgURL, replaceImages) => {
        try {
            const response = await fetch(imgURL);
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'image/svg+xml');

            if (!xml) return;

            const svg = xml.documentElement;
            const paths = svg.querySelectorAll('path');

            if (removeInlineCss) {
                // style属性を削除
                paths.forEach(path => path.removeAttribute('style'));
            }

            svg.removeAttribute('xmlns:a');

            // 配列メソッドmapを使って効率的に置き換え
            replaceImages.map(img => replaceImgWithSvg(img, structuredClone(svg)));
        } catch (error) {
            console.error('Failed to load SVG:', error);
        }
    };

    // 画像をSVGで置き換える
    const replaceImgWithSvg = (img, svg) => {
        const imgID = img.id;
        const imgClasses = img.getAttribute('class');

        if (imgID) svg.id = imgID;
        if (imgClasses) svg.classList.add(...imgClasses.split(' '), 'replaced-svg');

        img.replaceWith(svg); // 親要素に直接置き換える
    };

    // 画像をセレクターで取得
    const images = document.querySelectorAll(selector);

    // URLでソート
    images.forEach(img => {
        const imgURL = img.dataset.src || img.src;

        sortImages[imgURL] ||= []; // Nullish coalescingで配列の初期化を簡潔に
        sortImages[imgURL].push(img);
    });

    // すべてのURLに対してSVGをロード
    Object.keys(sortImages).forEach(key => loadSvg(key, sortImages[key]));
};
