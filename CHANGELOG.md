# Changelog

## [0.15.1](https://github.com/balsigergil/bloum/compare/v0.15.0...v0.15.1) (2025-09-14)

### Bug Fixes

* focus and button colors ([49b81e8](https://github.com/balsigergil/bloum/commit/49b81e83aff1389f2cd0ab71bbbbaf134d9556f1))

## [0.15.0](https://github.com/balsigergil/bloum/compare/v0.14.1...v0.15.0) (2025-09-13)

### Features

* update colors and dark theme ([f57f94b](https://github.com/balsigergil/bloum/commit/f57f94bd8307f247a04056f707e0c1b4c97bd028))

## [0.14.1](https://github.com/balsigergil/bloum/compare/v0.14.0...v0.14.1) (2025-09-13)

### Features

* **table:** add compact variant ([90c4b65](https://github.com/balsigergil/bloum/commit/90c4b658bfaa0e7fbe2f4f914d6d5244b3ae5147))

### Bug Fixes

* **card:** reduce font size (fix [#80](https://github.com/balsigergil/bloum/issues/80)) ([558207e](https://github.com/balsigergil/bloum/commit/558207e41671f5871ecc593784648324f5efbdd8))
* **modal:** add init when HTMX loads (fix [#81](https://github.com/balsigergil/bloum/issues/81)) ([a56125b](https://github.com/balsigergil/bloum/commit/a56125b14b914e56d1a9a5d976251a4b886ed966))

### Reverts

* **tab:** push browser history state (fix [#77](https://github.com/balsigergil/bloum/issues/77)) ([e4dca2a](https://github.com/balsigergil/bloum/commit/e4dca2a24e35d56e99dbe2d83303a9a7016b5ac4))

## [0.14.0](https://github.com/balsigergil/bloum/compare/v0.13.5...v0.14.0) (2025-09-06)

### Features

* add HTMX support globally (fix [#76](https://github.com/balsigergil/bloum/issues/76)) ([b2db2f5](https://github.com/balsigergil/bloum/commit/b2db2f59b1687fa733fb9c1cc6da07780f69ff30))
* make initialization functions globally available (fix [#75](https://github.com/balsigergil/bloum/issues/75)) ([f07dd1c](https://github.com/balsigergil/bloum/commit/f07dd1c754b9609affffbc0015098433341b0acb))
* **menu:** initialization with data attribute ([d06f216](https://github.com/balsigergil/bloum/commit/d06f216b3000aff135f812c1c5fe4c3973bec3d3))
* **tab:** push browser history state (fix [#77](https://github.com/balsigergil/bloum/issues/77)) ([3fa79c3](https://github.com/balsigergil/bloum/commit/3fa79c35d5156693820165c9354fad3d4aef74d8))

### Bug Fixes

* **combobox:** focus shadow is not the same as other inputs (fix [#79](https://github.com/balsigergil/bloum/issues/79)) ([d77b69b](https://github.com/balsigergil/bloum/commit/d77b69b682840d83d16c23cb4187747cdea213ed))
* **combobox:** no highlighting after the last item has been selected (fix [#60](https://github.com/balsigergil/bloum/issues/60)) ([b83b62f](https://github.com/balsigergil/bloum/commit/b83b62f7fc1f1e44b03d60ac18adfada0405c170))
* **combobox:** required does not work (fix [#69](https://github.com/balsigergil/bloum/issues/69)) ([d46bf8b](https://github.com/balsigergil/bloum/commit/d46bf8ba240ae1e5832de78cfa7b00026afefb5c))
* **combobox:** select first option on open when multiple ([abd2c32](https://github.com/balsigergil/bloum/commit/abd2c32730fe7b9a148f8b2346dd9ffae830472a))
* **combobox:** select options with empty value when multiple (fix [#72](https://github.com/balsigergil/bloum/issues/72)) ([03cf1d3](https://github.com/balsigergil/bloum/commit/03cf1d314fdd68eacdf9d76b88a1d843d2945535))
* **menu:** hidden behind background elements (fix [#74](https://github.com/balsigergil/bloum/issues/74)) ([0def07a](https://github.com/balsigergil/bloum/commit/0def07af600e52d835630dc35ad17ffe441c79c0))
* **modal:** close after drag and drop (fix [#73](https://github.com/balsigergil/bloum/issues/73)) ([0560939](https://github.com/balsigergil/bloum/commit/0560939791c1349b0a073351e38512874f9e4c05))
* **modal:** long modal cannot be scrolled (fix [#71](https://github.com/balsigergil/bloum/issues/71)) ([991432f](https://github.com/balsigergil/bloum/commit/991432f3b942d97a595245ecc548c85a35daa59c))

## [0.13.5](https://github.com/balsigergil/bloum/compare/v0.13.4...v0.13.5) (2025-08-02)

### Bug Fixes

* **modal:** remove overflow clip ([c1c98ee](https://github.com/balsigergil/bloum/commit/c1c98eecc0cc36ffa3df80859b7616d4840a9637))
* **modal:** selection in tab panel (fix [#70](https://github.com/balsigergil/bloum/issues/70)) ([b34a0b4](https://github.com/balsigergil/bloum/commit/b34a0b4e7c2fdc8418f0333e963a59f99a59ce7c))

## [0.13.4](https://github.com/balsigergil/bloum/compare/v0.13.3...v0.13.4) (2025-08-02)

### Features

* **modal:** add close all modals static method ([b248061](https://github.com/balsigergil/bloum/commit/b248061415c84c771b169bb1884a7eec608dc318))

## [0.13.3](https://github.com/balsigergil/bloum/compare/v0.13.2...v0.13.3) (2025-08-02)

### Bug Fixes

* **modal:** create instances at loading time ([45de047](https://github.com/balsigergil/bloum/commit/45de047e13e931e9e767519e1f0c6c7df2a641a8))

## [0.13.2](https://github.com/balsigergil/bloum/compare/v0.13.1...v0.13.2) (2025-07-23)

### Features

* **combobox:** add support for data attributes ([843ec6f](https://github.com/balsigergil/bloum/commit/843ec6f6e870d7722e7aea3834b1f3f7a4becc96))

## [0.13.1](https://github.com/balsigergil/bloum/compare/v0.13.0...v0.13.1) (2025-07-23)

## [0.13.0](https://github.com/balsigergil/bloum/compare/v0.12.2...v0.13.0) (2025-07-23)

## [0.12.2](https://github.com/balsigergil/bloum/compare/v0.12.1...v0.12.2) (2025-07-23)

### Bug Fixes

* **card:** overflow ([77a86f8](https://github.com/balsigergil/bloum/commit/77a86f8ed17a2b28fbc68e176b3bafc0f717da2e))
* **combobox:** exclude hidden options from selection ([e3e9be5](https://github.com/balsigergil/bloum/commit/e3e9be5b06f65ca4e6787893072ea25ae7115580))
* **combobox:** no result text toggle ([ec9e324](https://github.com/balsigergil/bloum/commit/ec9e324661606b84d8f032378bd0fdaae879ae69))
* **combobox:** placeholder styling ([aadfeb2](https://github.com/balsigergil/bloum/commit/aadfeb2e42b406ced1f0ee5e181c0b90835a937f))
* **combobox:** prevent selection when no options are available ([cd8c22a](https://github.com/balsigergil/bloum/commit/cd8c22a0cd3a0f0dd2cd53324ae930e90626d190))

## [0.12.1](https://github.com/balsigergil/bloum/compare/v0.12.0...v0.12.1) (2025-07-22)

### Bug Fixes

* **combobox:** clear exising container for HTMX ([2c7e3b5](https://github.com/balsigergil/bloum/commit/2c7e3b579798c260dc3d4af0e037404775cbfd9b))

## [0.12.0](https://github.com/balsigergil/bloum/compare/v0.11.1...v0.12.0) (2025-07-22)

### Features

* **combobox:** integrate floating-ui for dynamic dropdown positioning ([bddfcd4](https://github.com/balsigergil/bloum/commit/bddfcd41723440960b2ee34c2848e5c3532819b6))
* implement Pin Input component ([2dd6410](https://github.com/balsigergil/bloum/commit/2dd641075489d39ac63fce32acdaa9cd956fbc87))

## [0.11.1](https://github.com/balsigergil/bloum/compare/v0.11.0...v0.11.1) (2025-07-10)

## [0.11.0](https://github.com/balsigergil/bloum/compare/v0.10.1...v0.11.0) (2025-07-10)

### Features

- **drawer:** add drawer component ([1c562b5](https://github.com/balsigergil/bloum/commit/1c562b509028fcba5bc32fafc72ef711581a9044))
- **base:** set default font size to 14px

### Bug Fixes

- **card:** font weight css variable ([9715021](https://github.com/balsigergil/bloum/commit/97150217fdf556ce31b6c28b8ce32fdd2cf5b726))

## [0.10.1](https://github.com/balsigergil/bloum/compare/v0.10.0...v0.10.1) (2025-06-23)

### Bug Fixes

- **sidebar:** main content vertical alignement ([f008b2a](https://github.com/balsigergil/bloum/commit/f008b2a8bae60d30329599c108dbf3bdb0a1a8a4))

## [0.10.0](https://github.com/balsigergil/bloum/compare/v0.9.1...v0.10.0) (2025-06-22)

### Features

- **avatar:** add avatar component ([900a405](https://github.com/balsigergil/bloum/commit/900a405f65d88282c2b49920b5e2d4b7fe72154d))
- **button:** add split button ([287720e](https://github.com/balsigergil/bloum/commit/287720e316874c4bd9cbf5701f1d32557dcdf263))
- **datatable:** add DataTable component ([087e971](https://github.com/balsigergil/bloum/commit/087e971921decd5c3d58d1f661cc7770f50a9733))
- **input:** add password toggle ([46ddf3a](https://github.com/balsigergil/bloum/commit/46ddf3a3e021cdf806d388e54037a7b2f3a09346))
- **input:** add styles for range input component ([b1c7595](https://github.com/balsigergil/bloum/commit/b1c75956300325f01c40495ad4eaabc36803e155))
- **progress:** add progress component ([9298503](https://github.com/balsigergil/bloum/commit/9298503d31ab5d64a80751d7e6c2ebfc75166972))
- **sidebar:** implement collapsible menu ([5e88f29](https://github.com/balsigergil/bloum/commit/5e88f29daa4016bd54e1860d1c34939941213c87))
- **skeleton:** add skeleton component ([c875a7c](https://github.com/balsigergil/bloum/commit/c875a7c69a28ddeff34dd54f3e48c4b12f11b4ee))
- **steps:** add steps component ([0aa4f60](https://github.com/balsigergil/bloum/commit/0aa4f60fef9c93ca494e3d0ae744b3ee51f79d81))
- **tag:** add tag component ([5056e61](https://github.com/balsigergil/bloum/commit/5056e61aa0a565455e86dbaa24c8401b1eb1f14c))
- **timeline:** add timeline component ([090daa5](https://github.com/balsigergil/bloum/commit/090daa52b93c4aa6e9131d654aa27226ea52a6be))
- **toast:** add toast component ([4d739c0](https://github.com/balsigergil/bloum/commit/4d739c04b6224524ffe383dd7d554a5dc3e707be))

### Bug Fixes

- **button:** hide icon when loading ([af3117c](https://github.com/balsigergil/bloum/commit/af3117cf044ed784fa9dc998aa33f333cbaebab6))
- **checkbox:** disabled checkbox and radio ([ab05223](https://github.com/balsigergil/bloum/commit/ab0522383a8ee9dbc4f4c68fce4d52f3c3a31ae9))
- **tag:** tag clashes with prismjs in storybook ([7e1963f](https://github.com/balsigergil/bloum/commit/7e1963fe7cd8f0bee03d4b40923b36780a503436))
- **tag:** update tag component to disable removable ([c41287d](https://github.com/balsigergil/bloum/commit/c41287dc1948637ec6c07d9381890d41da12f014))

## [0.9.1](https://github.com/balsigergil/bloum/compare/v0.9.0...v0.9.1) (2025-03-10)

### Bug Fixes

- various style fixes ([880eae0](https://github.com/balsigergil/bloum/commit/880eae0453d35748150215975f703e6098ac2c37))

## [0.9.0](https://github.com/balsigergil/bloum/compare/v0.8.0...v0.9.0) (2025-03-10)

### Features

- **accordion:** add accordion component ([9f65dea](https://github.com/balsigergil/bloum/commit/9f65dea3745fcb8d43d5ead777b44c455dc36837))
- **badge:** add badge component ([ed08a5e](https://github.com/balsigergil/bloum/commit/ed08a5e84347129895ec271b9c813e95cc6be5bf))
- **breadcrumb:** add breadcrumb component ([bf4ec05](https://github.com/balsigergil/bloum/commit/bf4ec05c728de17cf00f6a6965550fc87250e2b6))
- **collapse:** add collapse component ([d46b97e](https://github.com/balsigergil/bloum/commit/d46b97e10e3d50e84d3d36e1543f883cbbd436a4))
- **command:** add command menu component ([fa20d74](https://github.com/balsigergil/bloum/commit/fa20d743282116e320ae471406b383238f7388e1))
- **copy:** add copy button custom element ([2cde7fd](https://github.com/balsigergil/bloum/commit/2cde7fd0b8338a2a6bc6cacf49185722cfe8941e))
- **menu:** add error menu item ([ae6a1eb](https://github.com/balsigergil/bloum/commit/ae6a1eb4b231339f131e21f741a8e7f4b7572ce1))
- **menu:** add open/close behaviors ([ff8a1dd](https://github.com/balsigergil/bloum/commit/ff8a1ddd767fa2deb28ed64b7d27c3419b6bcee6))
- **menu:** add style for menu ([3a41694](https://github.com/balsigergil/bloum/commit/3a41694ead23971621bcb6d557e97b0d4b75f6a8))
- **menu:** add support for icons and checkboxes ([af6ff0c](https://github.com/balsigergil/bloum/commit/af6ff0ca63b5899e5955e27cdb002ba3b50a6ffa))
- **modal:** add prefers-reduced-motion support ([9a1bcd0](https://github.com/balsigergil/bloum/commit/9a1bcd0a67448126a14132451ce1ae12d256f5bf))
- **pagination:** add pagination component ([ebd72ff](https://github.com/balsigergil/bloum/commit/ebd72fff5df7976869424d773edc05b8365841a2))
- **popover:** add popover component ([4d23a6e](https://github.com/balsigergil/bloum/commit/4d23a6e1a1eb7ed3e2a31f94704d5f984b924197))
- **switcher:** add color scheme switcher ([30e3ad8](https://github.com/balsigergil/bloum/commit/30e3ad8225bc4f758ecd8cbd5a92b672197b309c))

### Bug Fixes

- **combobox:** dark theme ([c8cd54d](https://github.com/balsigergil/bloum/commit/c8cd54db33e91a2521049b36e16d4b95e2853584))
- **menu:** dark mode color ([02a0d07](https://github.com/balsigergil/bloum/commit/02a0d07c3ff3443f73fd4d057434af9e54862584))
- **switch:** label layout shift ([5f610aa](https://github.com/balsigergil/bloum/commit/5f610aae10d71a3a08724fd2a76198932e8b7684))
- **tooltip:** flicker between hover and focus ([852483e](https://github.com/balsigergil/bloum/commit/852483e91e7bb3e2297d7fb4cd6f646353eae511))
- **tooltip:** keep open if still focused ([f82d201](https://github.com/balsigergil/bloum/commit/f82d201428601764a5bba23ec668a82f131a381b))

## [0.8.0](https://github.com/balsigergil/bloum/compare/v0.7.0...v0.8.0) (2025-03-01)

### Features

- **combobox:** display no results text ([d9825a3](https://github.com/balsigergil/bloum/commit/d9825a315eef1faf95ca68208297c5afdebe17fb))
- **select:** add destroy method ([639ba82](https://github.com/balsigergil/bloum/commit/639ba8277e86bf775dbd5e26689309630df67caa))
- **select:** basic select ([827c01d](https://github.com/balsigergil/bloum/commit/827c01d3606146321ccdf26602b88df0709a5c62))
- **select:** define initial selected option ([c2b1419](https://github.com/balsigergil/bloum/commit/c2b141984ee86d98d1c2e40b958cafe393d12b52))
- **select:** multiselect ([ab2089f](https://github.com/balsigergil/bloum/commit/ab2089f23b6db8654af8934e02228d937a9ed740))
- **select:** searchable select ([c90dd7e](https://github.com/balsigergil/bloum/commit/c90dd7e4b6e358ec44745002b04a0b426453ddd3))

### Bug Fixes

- **combobox:** multiple select not updated after deselecting ([90e4bba](https://github.com/balsigergil/bloum/commit/90e4bba34679d2751afd436603d37d18c665a13f))

## [0.7.0](https://github.com/balsigergil/bloum/compare/v0.6.4...v0.7.0) (2025-02-01)

### Features

- **sidebar:** ability to use form and button as sidebar item ([cc5feef](https://github.com/balsigergil/bloum/commit/cc5feefe0490e095d1c32115598b305e4dc6c52c))

## [0.6.4](https://github.com/balsigergil/bloum/compare/v0.6.3...v0.6.4) (2025-01-25)

### Bug Fixes

- **card:** remove overflow hidden ([fde056a](https://github.com/balsigergil/bloum/commit/fde056a0aee53f81d03f3c15bdef375d7cfae6a0))

## [0.6.3](https://github.com/balsigergil/bloum/compare/v0.6.2...v0.6.3) (2025-01-25)

## [0.6.2](https://github.com/balsigergil/bloum/compare/v0.6.1...v0.6.2) (2025-01-25)

## [0.6.1](https://github.com/balsigergil/bloum/compare/v0.6.0...v0.6.1) (2025-01-25)

## [0.6.0](https://github.com/balsigergil/bloum/compare/v0.5.7...v0.6.0) (2025-01-25)

### Bug Fixes

- tab history ([873ec74](https://github.com/balsigergil/bloum/commit/873ec74833c691e75c17c957890fd9a3b74a361b))

## [0.5.7](https://github.com/balsigergil/bloum/compare/v0.5.6...v0.5.7) (2025-01-18)

### Bug Fixes

- sidebar z-index ([318052f](https://github.com/balsigergil/bloum/commit/318052f2d97418707b74c0a02d0892c42d49fb5e))

## [0.5.6](https://github.com/balsigergil/bloum/compare/v0.5.5...v0.5.6) (2025-01-18)

### Bug Fixes

- tooltip, modal, tabs ([8e43b16](https://github.com/balsigergil/bloum/commit/8e43b16d0939ddf1ad1ecbf560399dd8f464609c))

## [0.5.5](https://github.com/balsigergil/bloum/compare/v0.5.4...v0.5.5) (2025-01-17)

### Bug Fixes

- tab panel padding ([837f022](https://github.com/balsigergil/bloum/commit/837f02285d5abd2c49dab0396c5ba730a4223897))

## [0.5.4](https://github.com/balsigergil/bloum/compare/v0.5.3...v0.5.4) (2025-01-17)

### Bug Fixes

- tabs anchor, form height, card table border ([4516786](https://github.com/balsigergil/bloum/commit/45167862c5effb523345f09f1359b8895ae5d3dc))

## [0.5.3](https://github.com/balsigergil/bloum/compare/v0.5.2...v0.5.3) (2025-01-15)

## [0.5.2](https://github.com/balsigergil/bloum/compare/v0.5.1...v0.5.2) (2025-01-15)

## [0.5.1](https://github.com/balsigergil/bloum/compare/v0.5.0...v0.5.1) (2025-01-14)

## [0.5.0](https://github.com/balsigergil/bloum/compare/v0.4.1...v0.5.0) (2025-01-13)

### Features

- close modal from custom event ([f8f59ca](https://github.com/balsigergil/bloum/commit/f8f59ca29d4b8b15b304a28fd050b553bf06d4e6))

## [0.4.1](https://github.com/balsigergil/bloum/compare/v0.4.0...v0.4.1) (2025-01-13)

### Features

- handle text brand in sidebar ([cd4aa95](https://github.com/balsigergil/bloum/commit/cd4aa95f6959e719b1b9ceab875d34399ce6c293))

### Bug Fixes

- modal ([76ddd9c](https://github.com/balsigergil/bloum/commit/76ddd9ca631fc6a0d80c6e52f27f26c2e02af23e))

## [0.4.0](https://github.com/balsigergil/bloum/compare/v0.3.0...v0.4.0) (2025-01-09)

### Features

- add alert component ([72b2334](https://github.com/balsigergil/bloum/commit/72b23341ebab4a6f650e0b7125a6095f9f12adda))
- add alert component ([7b6b6a6](https://github.com/balsigergil/bloum/commit/7b6b6a66a475bf7f1c2c939e19bd724c6728e675))
- add autogrow textarea ([6c20998](https://github.com/balsigergil/bloum/commit/6c209983423fc7d2ca12550ac0f196cc5426ac32))
- add button and icon button style ([f3ad439](https://github.com/balsigergil/bloum/commit/f3ad439207310729acf8c8a4294318f3f10c6418))
- add input group ([5718710](https://github.com/balsigergil/bloum/commit/571871060c2d8febb58baf2bd1392c8f3f1eb70b))
- add modal component ([b62957a](https://github.com/balsigergil/bloum/commit/b62957aecd669330af768a92f69c46a8ff165aac))
- add sidebar component ([4d60201](https://github.com/balsigergil/bloum/commit/4d6020127420847c4b4b6b410c511ea0794c14e0))
- add spinner component ([d8d5f29](https://github.com/balsigergil/bloum/commit/d8d5f2947443beecff6b6041e2cfc3c0850e2a27))
- add toggle switch ([fe0bfbc](https://github.com/balsigergil/bloum/commit/fe0bfbc9030d636c9ccb9ff274a68456675d9379))
- add tooltip component ([234172f](https://github.com/balsigergil/bloum/commit/234172f5624f1bda357423534680ad68e0aedab7))
- buttons OK ([34aedc6](https://github.com/balsigergil/bloum/commit/34aedc6e0fed63ac3219fe8fa0c1c83064ff3c65))
- card OK ([29d4882](https://github.com/balsigergil/bloum/commit/29d4882361d15eb249a0b049ed34ec8d6c65b8a0))
- card OK ([4dc69db](https://github.com/balsigergil/bloum/commit/4dc69dbb2e1f49641d560920c103247e26858eb0))
- forms and checkbox card ([5fac796](https://github.com/balsigergil/bloum/commit/5fac7963852e15ab92792fb9528b65abb49ec44d))
- migrate collapse component to Lit ([1809bf0](https://github.com/balsigergil/bloum/commit/1809bf0a43aab69bdc5923aebb85ae724f16bba5))
- radio card ([e74d7fb](https://github.com/balsigergil/bloum/commit/e74d7fbe6316f39268a89b3d97191539c105126f))
- table in card ([3845e0e](https://github.com/balsigergil/bloum/commit/3845e0eaf5e831ffe6beb7a1f4391f2ba49aa56e))
- table OK ([5ac897e](https://github.com/balsigergil/bloum/commit/5ac897e110aba4b9db2e96b5af21e26f3334f10f))
- tabs OK ([58cef55](https://github.com/balsigergil/bloum/commit/58cef558477691b0a9c253744910cdbb49610f9c))
- update StoryBook ([034ce5f](https://github.com/balsigergil/bloum/commit/034ce5f84114dcd7ffd0317c755d0f05e6f0f5e0))

### Bug Fixes

- **select:** enter with no results ([3019483](https://github.com/balsigergil/bloum/commit/3019483988696f7b926bd922b666810bcfda94bf))

## [0.3.0](https://github.com/balsigergil/bloum/compare/v0.2.0...v0.3.0) (2024-03-04)

### Features

- **date-picker:** basic calendar view ([3693cc4](https://github.com/balsigergil/bloum/commit/3693cc42f540779a073eddf4a1078551e9aaaaca))
- **date-picker:** connect inputs to calendar view ([79ee9ee](https://github.com/balsigergil/bloum/commit/79ee9ee102a41e239755913eb191b113f1b7fee1))
- **date-picker:** input behaviours ([65b08b0](https://github.com/balsigergil/bloum/commit/65b08b00bdf1837f854230330ab7229847b749fc))
- supports dark color scheme (fix [#1](https://github.com/balsigergil/bloum/issues/1)) ([84c303f](https://github.com/balsigergil/bloum/commit/84c303f9af5f73b47cbcd7f6c10a30f380782300))

### Bug Fixes

- dark mode with class instead of media ([21d99fb](https://github.com/balsigergil/bloum/commit/21d99fb14f465cf223c97576293889ffb5e2ef1e))
- **select:** click event propagation ([f314d98](https://github.com/balsigergil/bloum/commit/f314d98583759ef835ced593c989b03cca09a99c))
- **select:** focus first option after search ([cff0f61](https://github.com/balsigergil/bloum/commit/cff0f6154b3a243b3280d78acade00ea30972f18))
- **select:** focus input after transition ([e34ede6](https://github.com/balsigergil/bloum/commit/e34ede6f00d2b01b294cd46a30bcb1c1d230d4b6))
- **select:** scrolling when clicking outside ([6891292](https://github.com/balsigergil/bloum/commit/6891292915de03fc91949681b04bb02deb86e898))
- **tabs:** init tabs only after all children are connected (fix [#6](https://github.com/balsigergil/bloum/issues/6)) ([bbd79fc](https://github.com/balsigergil/bloum/commit/bbd79fcf44298052dfa8da410e3447cd44d8bdbe))

## [0.2.0](https://github.com/balsigergil/bloum/compare/v0.1.3...v0.2.0) (2024-01-27)

### Features

- **accordion:** add accordion component ([880fbcb](https://github.com/balsigergil/bloum/commit/880fbcbf45701fe625fec8ab2a786e2c5a69f5ce))
- **accordion:** add modern style ([9f02b28](https://github.com/balsigergil/bloum/commit/9f02b286623cd61bbb527bc2821bfa5abccbc4de))
- **collapse:** add collapse component ([8254ece](https://github.com/balsigergil/bloum/commit/8254ece53f37adac4ac438a6cfe5976f1670de2c))
- **select:** add disabled attribute ([21d6a42](https://github.com/balsigergil/bloum/commit/21d6a42a2b3f4905c4bf4619860e5a38689fd440))

### Bug Fixes

- **modal:** focus first element if current not in modal ([988d8c8](https://github.com/balsigergil/bloum/commit/988d8c8170d897bdc89a6d4f7b6277130cb81ca3))
- **select:** placeholder text is dimmed only if searchable ([fc3d972](https://github.com/balsigergil/bloum/commit/fc3d9729a8c7f61faea4ced88cb289d3653bc17e))

## [0.1.3](https://github.com/balsigergil/bloum/compare/v0.1.2...v0.1.3) (2024-01-26)

### Bug Fixes

- **modal:** prevent body scrolling when open (fix [#2](https://github.com/balsigergil/bloum/issues/2)) ([725b847](https://github.com/balsigergil/bloum/commit/725b847efd7c5bc8e37e99bf2ef046daa220c2d2))
- **select:** multiselect option is toggled when menu is closed (fix [#4](https://github.com/balsigergil/bloum/issues/4)) ([fca4f34](https://github.com/balsigergil/bloum/commit/fca4f347b87e493ea444a5a8eba0418a613a3a55))
- **toast:** toast do not display correctly on mobile (fix [#5](https://github.com/balsigergil/bloum/issues/5)) ([80d2d44](https://github.com/balsigergil/bloum/commit/80d2d44a3f0bee8ade800e7094418c44de391881))

## [0.1.2](https://github.com/balsigergil/bloum/compare/v0.1.1...v0.1.2) (2024-01-21)

### Bug Fixes

- **closeButton:** fire click event when Enter or space is pressed ([0a0f091](https://github.com/balsigergil/bloum/commit/0a0f0918535f1c1dde50a93d2522e17cee23e7a2))
- **modal:** no focusable element on open ([55b5b0e](https://github.com/balsigergil/bloum/commit/55b5b0ed2f0777e45c240dc225569d8333019c8d))
- **select:** click on input should open the menu ([ea2e4a0](https://github.com/balsigergil/bloum/commit/ea2e4a06929d93f9211c977e2d7f79a180b0a572))

## [0.1.1](https://github.com/balsigergil/bloum/compare/v0.1.0...v0.1.1) (2024-01-21)

### Bug Fixes

- **modal:** handle empty focusableElements array ([cbd3c84](https://github.com/balsigergil/bloum/commit/cbd3c84c3aa41e5e5f0474f1131f3cff13afe86f))

## [0.1.0](https://github.com/balsigergil/bloum/compare/v0.0.6...v0.1.0) (2024-01-21)

### Features

- **modal:** add ARIA accessibility ([9c3921e](https://github.com/balsigergil/bloum/commit/9c3921e647f57d7a96c84de9618ee714557086c3))
- **tabs:** add ARIA roles ([7f62cd5](https://github.com/balsigergil/bloum/commit/7f62cd5db13f6ad4d3975d977408a0fed00da92d))
- **toast:** add close button ([9daed9c](https://github.com/balsigergil/bloum/commit/9daed9cc7a1c8724ad6c7d1fb3bc4ccb68e3a862))
- **toast:** add icons ([9e575f8](https://github.com/balsigergil/bloum/commit/9e575f8956040f5645871d5b23bd755643e72b3d))
- **toast:** add toast component ([4de4b3c](https://github.com/balsigergil/bloum/commit/4de4b3c6781b2e176dcc961623148bd90864e20d))

### Bug Fixes

- customized built-in element not supported on WebKit ([3071a43](https://github.com/balsigergil/bloum/commit/3071a43267e4187da9f83ce11e92b7fba47fc899))
- **select:** input shrink to 60px minimum ([236f97d](https://github.com/balsigergil/bloum/commit/236f97df27798ac47ebfa2d55ec674fdb7ef9344))
- **select:** select reopen on left click ([fe49ed7](https://github.com/balsigergil/bloum/commit/fe49ed74d1964726a4a8632743ccadbd9675c3e6))

## [0.0.6](https://github.com/balsigergil/bloum/compare/v0.0.5...v0.0.6) (2024-01-20)

## [0.0.5](https://github.com/balsigergil/bloum/compare/v0.0.4...v0.0.5) (2024-01-20)

## [0.0.4](https://github.com/balsigergil/bloum/compare/v0.0.3...v0.0.4) (2024-01-20)

## [0.0.3](https://github.com/balsigergil/bloum/compare/v0.0.1...v0.0.3) (2024-01-17)

### Bug Fixes

- **tabs:** extends of HTMLElement instead of Button element ([d7b3d11](https://github.com/balsigergil/bloum/commit/d7b3d11af669c140fbb3ad989e3c1cfea778eb14))

## [0.0.1](https://github.com/balsigergil/bloum/compare/dfa00037647dcdf775a4aa70f3066be95e6b9f23...v0.0.1) (2024-01-16)

### Features

- add basic behaviour for dropdown menu ([dfa0003](https://github.com/balsigergil/bloum/commit/dfa00037647dcdf775a4aa70f3066be95e6b9f23))
- **alert:** add alert dialog ([720b5ec](https://github.com/balsigergil/bloum/commit/720b5ec6b7ac8aaffa48824e12395d10408bb073))
- dropdown active element ([6e1b39b](https://github.com/balsigergil/bloum/commit/6e1b39bcb7c3b22282a41f81cff149c012cf47cd))
- extract style in modern.css ([87e9316](https://github.com/balsigergil/bloum/commit/87e9316c6cbbedc723e5c051cf19900ba404f4e2))
- **modal:** add modal web component ([8558417](https://github.com/balsigergil/bloum/commit/85584172a3d839c3ab057c589d7b15351d518b34))
- **modal:** focus target button when close modal ([a9f154c](https://github.com/balsigergil/bloum/commit/a9f154c2d0aedc68fd8d0d4ee6be6ad036420d24))
- **modal:** lock focus within modal ([c4ae566](https://github.com/balsigergil/bloum/commit/c4ae566658615f0e0766a3968bbca6336511a5f3))
- **modal:** scrollable modal ([3bbf401](https://github.com/balsigergil/bloum/commit/3bbf4010654cf17529a1983d9bdc04b985f14f62))
- resize height on content, add data-text attribute ([20850f7](https://github.com/balsigergil/bloum/commit/20850f7431b87098e0a843017c102c11e3a69485))
- **select:** add arrow indicator ([60472ef](https://github.com/balsigergil/bloum/commit/60472efdde39840bd6f152776d878e1f2b4be4fa))
- **select:** add clearable option ([0c0d5f0](https://github.com/balsigergil/bloum/commit/0c0d5f01e202ab0f4adff6d8416a4eee6caf7cdf))
- **select:** add close button on multiple select ([dc48c0b](https://github.com/balsigergil/bloum/commit/dc48c0b9006abffc4c6901f8873217935d7881fd))
- **select:** add modern theme ([27dc75b](https://github.com/balsigergil/bloum/commit/27dc75b19d29060d4cbc5b33f3411d5516dea582))
- **select:** add multiple select ([e78dd2a](https://github.com/balsigergil/bloum/commit/e78dd2ab6508903199130cb59aaec2edc268d26b))
- **select:** bind to native HTML select element ([f9f1478](https://github.com/balsigergil/bloum/commit/f9f1478e3fa4c92a1f2465bc3173af544b231c70))
- **select:** remove item with backspace ([a393615](https://github.com/balsigergil/bloum/commit/a3936159e58c763b662512020b892eaa0ff36a0e))
- **select:** replace position absolute by display grid, add searchable feature ([1b9d15d](https://github.com/balsigergil/bloum/commit/1b9d15dbdea8c9824bc73c5e89b496875d1fec28))
- **tabs:** add anchor links ([e917fab](https://github.com/balsigergil/bloum/commit/e917faba34180cb9ab98c5543516cb770e4ef618))
- **tabs:** add modern theme to tabs ([0c77bd1](https://github.com/balsigergil/bloum/commit/0c77bd14e30ca8af6d8e0c65e18263fa063f7efb))
- **tabs:** add tabs ([faa7a7f](https://github.com/balsigergil/bloum/commit/faa7a7fcf0b48044fcefbdeb66db2579131e1c75))

### Bug Fixes

- select element with keyboard while filtering ([560854e](https://github.com/balsigergil/bloum/commit/560854e349393123d2f1e25fcaf6d3009df705ba))
- **select:** text opacity when menu is open ([73ff208](https://github.com/balsigergil/bloum/commit/73ff208bc63602a7e131ed44f166de1033f78fe6))
- **tabs:** add theme class ([269906a](https://github.com/balsigergil/bloum/commit/269906a7918c60c45024633d73eff4bb72e1bae6))
