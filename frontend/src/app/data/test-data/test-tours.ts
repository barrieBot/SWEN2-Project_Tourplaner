import { Tour } from '../models/tour'
import { tansportType } from '../models/transportType'



export let mockedTours: Tour[] = [
  { id: "tour1",
    name: "Tour de France",
    description: "Fahrradtour durch Frankreich",
    transportType: TransportType.CYCLING_REGULAR,
    distance: 50,
    estimatedTime: 200,
    popularity: 4,
    childFriendliness: 1,
    logs: []
  },
  { id: "tour2",
    name: "Wiener Ringtour",
    description: "Ein Spaziergang durch die Wiener Innenstadt",
    transportType: TransportType.FOOT_WALKING,
    distance: 8,
    estimatedTime: 120,
    popularity: 3,
    childFriendliness: 3,
    logs: []
  },
  { id: "tour3",
    name: "Großglockner Downhill",
    description: "Mit dem Rad den Großglockner hinunter",
    transportType: TransportType.CYCLING_REGULAR,
    distance: 25,
    estimatedTime: 240,
    popularity: 4,
    childFriendliness: 1,
    logs: []
  },
  { id: "tour4",
    name: "Arbeitsweg",
    description: "Schnellster Weg in die Arbeit",
    transportType: TransportType.FOOT_WALKING,
    distance: 18,
    estimatedTime: 45,
    popularity: 1,
    childFriendliness: 5,
    logs: []
  },
];
