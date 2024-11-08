import { Header } from "../../containers/header";
import { Footer } from "../../containers/footer";
import { Tags } from "../../components/tags";
import './index.css'

export function User() {
    return (
<div>
    <div>
      <Header />
    </div>
     <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
     <Tags />
    </main>
    <div>
     <Footer />
    </div>
</div>
    );
}