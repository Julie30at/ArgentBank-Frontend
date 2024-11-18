import { Header } from '../../components/header/index';
import { Footer } from '../../components/footer';
import { Banner } from '../../components/banner';
import { Features } from '../../components/features';

export function Home() {

  return (
    <div>
      <Header pageType="home" />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
