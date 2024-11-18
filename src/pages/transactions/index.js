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