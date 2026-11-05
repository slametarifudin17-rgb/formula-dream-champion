export const FDC_TEAMS = [
  {id:"apex",name:"APEX MERIDIAN RACING",short:"AMR",primary:"#b7c4d2",secondary:"#20c7bd",drivers:["Adrian Vale","Luca Moreau"]},
  {id:"vortex",name:"VORTEX GRAND PRIX",short:"VTX",primary:"#7046c8",secondary:"#b5ef35",drivers:["Kai Mercer","Dante Silva"]},
  {id:"aurelia",name:"SCUDERIA AURELIA",short:"AUR",primary:"#c82c36",secondary:"#e9bd55",drivers:["Matteo Ricci","Enzo Bellini"]},
  {id:"northstar",name:"NORTHSTAR MOTORSPORT",short:"NSM",primary:"#142d58",secondary:"#48c7e8",drivers:["Noah Bennett","Sora Tanaka"]},
  {id:"titan",name:"TITAN FORGE RACING",short:"TFR",primary:"#e87527",secondary:"#252a31",drivers:["Rafael Costa","Milan Petrov"]},
  {id:"solstice",name:"SOLSTICE RACING",short:"SOL",primary:"#e5c52d",secondary:"#20242b",drivers:["Theo Martin","Felix Bauer"]},
  {id:"orion",name:"ORION VELOCITY",short:"ORV",primary:"#2864b7",secondary:"#f2f4f6",drivers:["Elliot Ward","Hugo Laurent"]},
  {id:"falcon",name:"FALCON CREST GP",short:"FCG",primary:"#187b58",secondary:"#101a1a",drivers:["Nico Reyes","Jules Bernard"]},
  {id:"vertex",name:"VERTEX DYNAMICS",short:"VRX",primary:"#e8e9ee",secondary:"#d34d9a",drivers:["Daniel Kim","Oscar Lind"]},
  {id:"bluehaven",name:"BLUEHAVEN RACING",short:"BHR",primary:"#27a9bd",secondary:"#152c48",drivers:["Tomás Vega","Samir Khan"]},
  {id:"ironclad",name:"IRONCLAD MOTORSPORT",short:"ICM",primary:"#9b7650",secondary:"#202124",drivers:["Finn Cooper","Alex Novak"]},
  {id:"garvion",name:"GARVION RACING",short:"GRV",primary:"#d71928",secondary:"#f1f2f4",drivers:["ARIF · PLAYER","Mika Sato"]}
];
export const FDC_ROSTER = FDC_TEAMS.flatMap(team => team.drivers.map((name,seat) => ({
  name, seat, teamId:team.id, teamName:team.name, color:team.primary, accent:team.secondary
})));
export function getTeam(id){return FDC_TEAMS.find(team=>team.id===id)||FDC_TEAMS.find(team=>team.id==="garvion");}
