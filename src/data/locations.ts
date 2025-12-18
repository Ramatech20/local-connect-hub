// Kenya cities and estates data
export const kenyaCities = [
  {
    id: "nairobi",
    name: "Nairobi",
    estates: [
      "Westlands", "Kilimani", "Karen", "Lavington", "Runda", "Muthaiga",
      "Kileleshwa", "Parklands", "South B", "South C", "Eastleigh", "Kasarani",
      "Roysambu", "Embakasi", "Donholm", "Umoja", "Buruburu", "CBD",
      "Industrial Area", "Ngara", "Pangani", "Mathare", "Kayole"
    ]
  },
  {
    id: "mombasa",
    name: "Mombasa",
    estates: [
      "Nyali", "Bamburi", "Mtwapa", "Kizingo", "Tudor", "Likoni",
      "Changamwe", "Shanzu", "Kisauni", "Old Town", "Ganjoni", "Miritini"
    ]
  },
  {
    id: "kisumu",
    name: "Kisumu",
    estates: [
      "Milimani", "Tom Mboya", "Kondele", "Nyalenda", "Mamboleo",
      "Migosi", "Dunga", "Kibos", "Awasi", "CBD"
    ]
  },
  {
    id: "nakuru",
    name: "Nakuru",
    estates: [
      "Milimani", "Section 58", "London", "Lanet", "Shabab",
      "Free Area", "Lake View", "Bondeni", "Kaptembwo", "CBD"
    ]
  },
  {
    id: "eldoret",
    name: "Eldoret",
    estates: [
      "Langas", "Huruma", "Kapsoya", "Pioneer", "Elgon View",
      "West Indies", "Kimumu", "Annex", "Kipkaren", "CBD"
    ]
  },
  {
    id: "kakamega",
    name: "Kakamega",
    estates: [
      "Milimani", "Amalemba", "Lurambi", "Mahiakalo", "Shirere",
      "Bukhungu", "Isecheno", "CBD"
    ]
  }
] as const;

export type CityId = typeof kenyaCities[number]["id"];
export type City = typeof kenyaCities[number];

export const getCityEstates = (cityId: string): string[] => {
  const city = kenyaCities.find(c => c.id === cityId);
  return city ? [...city.estates] : [];
};

export const getAllCities = () => kenyaCities.map(c => ({ id: c.id, name: c.name }));
