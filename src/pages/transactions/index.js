//cette page sert actuellement à montrer le bon fonctionnement de la route (il n'était pas demandé de coder son contenu)

import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Tags } from '../../components/tags';

export function Transactions() {
    return(
          <div>
      <Header pageType="edit" />
      <main>
        <Tags isTransactionPage={true} />
      </main>
      <Footer />
         </div>
    );
}