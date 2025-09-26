
import { DummyLeads }    from "./DummyLeads.js";
import { TrendingLeads } from "./DummyLeads.js";
import { PopularLeads }  from "./DummyLeads.js";


export const AllLeads = [...TrendingLeads, ...PopularLeads, ...DummyLeads];
