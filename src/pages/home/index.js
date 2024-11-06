import { Header } from '../../containers/header/index';
import { Footer } from '../../containers/footer';
import { Banner } from '../../containers/banner';
import { Features } from '../../containers/features';

export function Home() {
  return (
    <body>
   <div>
      <Header />
    </div>
    <main>
      <Banner />
      <Features />
    </main>
    <div>
      <Footer />
    </div>
  </body>
  );
}