import { Search } from "../../components/search/search";
import './host.css';
import { useState } from "react";
import dropdown from "./assets/dropdown.svg";
import { Buisness } from "./buisness";
import { Individual } from "./individual";

const Hosts = () => {
    const [activeTab, setActiveTab] = useState(1)
    const [search, setSearch] = useState('')

    return (
        <>
            <Search onChange={(e) => setSearch(e.target.value)} placeholder={activeTab === 1 ? 'Search individual host' : 'Search Business host'} />
            <section className="host">
                <div className="host-heading">
                    <div>
                        <h2>Hosts</h2>
                        <p>List of all Hosts</p>
                    </div>
                    <button>
                        <span>Filter</span>
                        <img src={dropdown} alt="dropdown" />
                    </button>
                </div>
                <section className="table-section">
                    <div className="host-type">
                        <button className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>Individual</button><button className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>Business</button>
                    </div>
                    {activeTab === 1 && <Individual search={search} />}
                    {activeTab === 2 && <Buisness search={search} />}
                </section>
            </section>
        </>
    )
}

export default Hosts