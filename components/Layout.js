import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, maximum-scale=1.0, minimum-scale=1.0' />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      <link rel="icon" type="image/png" href="//en.arguman.org/static/img/favicon.png"/>
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/144x114.png" />
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/114.png" />
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/72x72.png" />
      <link rel="apple-touch-icon-precomposed" href="/static/touch-icon.png" />
      <meta name="apple-touch-fullscreen" content="yes" />
    </Head>
    { children }
    <footer></footer>
    <style jsx global>{`
      html,
      body {
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        background: #fff;
      }

      body {
        font-family: AmericanTypewriter, Georgia, serif;
        margin: 0;
      }

      @font-face {
        font-family: 'AmericanTypewriter';
        src:url('//arguman.org/static/fonts/AmericanTypewriter.ttf');
      }

      @font-face {
        font-family: 'AmericanTypewriterBold';
        src:url('//arguman.org/static/fonts/AmericanTypewriterBold.ttf');
      }
    `}</style>
  </div>
);
