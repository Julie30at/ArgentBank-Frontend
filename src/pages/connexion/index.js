import { Header } from '../../components/header';
import { SignInContent } from '../../components/SignInContent';
import { Footer } from '../../components/footer';

export function Connexion() {
  

  return (
    <div>
      <Header pageType="connexion"  />
      <SignInContent />
      <Footer />
    </div>
  );
}
