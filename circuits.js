export const CIRCUITS = [
{id:"melbourne",name:"AUSTRALIA · ALBERT PARK",country:"Australia",style:"street",seed:1,weather:"changeable",feature:"Fast lakeside street circuit"},
{id:"shanghai",name:"CHINA · SHANGHAI",country:"China",style:"technical",seed:2,weather:"changeable",feature:"Long tightening Turn 1 and back straight"},
{id:"suzuka",name:"JAPAN · SUZUKA",country:"Japan",style:"figure8",seed:3,weather:"rainy",feature:"Figure-eight layout and Esses"},
{id:"miami",name:"MIAMI · INTERNATIONAL AUTODROME",country:"USA",style:"street",seed:4,weather:"storm",feature:"Long straights and slow technical section"},
{id:"montreal",name:"CANADA · CIRCUIT GILLES-VILLENEUVE",country:"Canada",style:"street",seed:5,weather:"changeable",feature:"Stop-start island circuit"},
{id:"monaco",name:"MONACO · MONTE CARLO",country:"Monaco",style:"tight",seed:6,weather:"dry",feature:"Narrow harbour street circuit"},
{id:"barcelona",name:"SPAIN · BARCELONA-CATALUNYA",country:"Spain",style:"flow",seed:7,weather:"dry",feature:"Technical final sector and long corners"},
{id:"spielberg",name:"AUSTRIA · RED BULL RING",country:"Austria",style:"hills",seed:8,weather:"changeable",feature:"Elevation changes and heavy braking"},
{id:"silverstone",name:"GREAT BRITAIN · SILVERSTONE",country:"United Kingdom",style:"fast",seed:9,weather:"rainy",feature:"High-speed flowing complexes"},
{id:"spa",name:"BELGIUM · SPA-FRANCORCHAMPS",country:"Belgium",style:"forest",seed:10,weather:"rainy",feature:"Eau Rouge-inspired climb and long lap"},
{id:"hungaroring",name:"HUNGARY · HUNGARORING",country:"Hungary",style:"technical",seed:11,weather:"dry",feature:"Tight, twisty rhythm"},
{id:"zandvoort",name:"NETHERLANDS · ZANDVOORT",country:"Netherlands",style:"banked",seed:12,weather:"changeable",feature:"Banked turns and dunes"},
{id:"monza",name:"ITALY · MONZA",country:"Italy",style:"fast",seed:13,weather:"dry",feature:"Long straights and chicanes"},
{id:"madrid",name:"SPAIN · MADRID",country:"Spain",style:"street",seed:14,weather:"dry",feature:"New-generation city circuit concept"},
{id:"baku",name:"AZERBAIJAN · BAKU",country:"Azerbaijan",style:"street",seed:15,weather:"windy",feature:"Long boulevard and narrow old-town section"},
{id:"bahrain",name:"BAHRAIN · SAKHIR",country:"Bahrain",style:"desert",seed:16,weather:"dry",feature:"Desert circuit with heavy braking zones"},
{id:"jeddah",name:"SAUDI ARABIA · JEDDAH CORNICHE",country:"Saudi Arabia",style:"street",seed:24,weather:"dry",feature:"Fast flowing coastal street circuit"},
{id:"singapore",name:"SINGAPORE · MARINA BAY",country:"Singapore",style:"night",seed:17,weather:"storm",feature:"Tight illuminated night street circuit"},
{id:"austin",name:"USA · CIRCUIT OF THE AMERICAS",country:"USA",style:"hills",seed:18,weather:"changeable",feature:"Steep opening climb and flowing esses"},
{id:"mexico",name:"MEXICO · HERMANOS RODRIGUEZ",country:"Mexico",style:"stadium",seed:19,weather:"dry",feature:"High-altitude stadium section"},
{id:"interlagos",name:"BRAZIL · INTERLAGOS",country:"Brazil",style:"hills",seed:20,weather:"storm",feature:"Anti-clockwise undulating lap"},
{id:"lasvegas",name:"LAS VEGAS · STRIP CIRCUIT",country:"USA",style:"night",seed:21,weather:"dry",feature:"Long neon-lit boulevard"},
{id:"lusail",name:"QATAR · LUSAIL",country:"Qatar",style:"fast",seed:22,weather:"dry",feature:"Fast sweeping corners"},
{id:"yasmarina",name:"ABU DHABI · YAS MARINA",country:"UAE",style:"night",seed:23,weather:"dry",feature:"Twilight race around marina"}
];
export function makeLayout(c){
 const pts=[],n=72,phase=c.seed*.73;
 const profiles={
 street:[1,.19,.10,.08],technical:[1,.29,.22,.10],figure8:[1,.18,.44,.12],tight:[1,.10,.12,.06],
 flow:[1,.13,.17,.05],hills:[1,.24,.13,.12],fast:[1,.09,.07,.04],forest:[1,.22,.18,.08],
 banked:[1,.17,.12,.05],desert:[1,.15,.08,.04],night:[1,.26,.18,.07],stadium:[1,.18,.27,.09]
 };
 const p=profiles[c.style]||profiles.flow;
 for(let i=0;i<n;i++){
  const t=i/n*Math.PI*2;
  let r=1+p[1]*Math.sin(3*t+phase)+p[2]*Math.cos(5*t-phase*.6)+p[3]*Math.sin(7*t+phase*.3);
  let x=Math.sin(t)*r, z=Math.cos(t)*(1+.12*Math.sin(2*t+phase));
  if(c.style==="figure8") x+=.20*Math.sin(2*t);
  if(c.style==="street"||c.style==="night") {x=Math.sign(x)*Math.pow(Math.abs(x),.78);z=Math.sign(z)*Math.pow(Math.abs(z),.82);}
  if(c.style==="fast") z*=.82;
  if(c.style==="tight"){x*=.78;z*=.78;}
  pts.push({x:x*88,z:z*59});
 }
 return pts;
}