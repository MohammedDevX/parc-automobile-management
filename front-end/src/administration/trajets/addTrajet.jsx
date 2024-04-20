// import { useState, useEffect } from "react";

// const AddTrajet = () => {
//     const [startAddress, setStartAddress] = useState("");
//     const [endAddress, setEndAddress] = useState("");
//     const [startSuggestions, setStartSuggestions] = useState([]);
//     const [endSuggestions, setEndSuggestions] = useState([]);
//     const [distance, setDistance] = useState(null);
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [status, setStatus] = useState("");
//     const [tripType, setTripType] = useState("");

//     useEffect(() => {
//         if (
//             startAddress &&
//             endAddress &&
//             tripType &&
//             endSuggestions.length === 0
//         ) {
//             calculateDistance();
//         } else {
//             setDistance(null);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [startAddress, endAddress, tripType, endSuggestions]);

//     const handleStartChange = async (event) => {
//         const { value } = event.target;
//         setStartAddress(value);

//         const suggestions = await fetchSuggestions(value);
//         setStartSuggestions(suggestions);
//     };

//     const handleEndChange = async (event) => {
//         const { value } = event.target;
//         setEndAddress(value);

//         const suggestions = await fetchSuggestions(value);
//         setEndSuggestions(suggestions);
//     };

//     const handleSelectPlace = (address, setAddress, setSuggestions) => {
//         setAddress(address);
//         setSuggestions([]);
//     };

//     const fetchSuggestions = async (query) => {
//         try {
//             // Construct the request URL
//             const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//                 query
//             )}&format=json`;

//             // Fetch suggestions from the Nominatim API
//             const response = await fetch(url);
//             const data = await response.json();

//             return data;
//         } catch (error) {
//             console.error("Error fetching suggestions:", error);
//             return [];
//         }
//     };

//     const calculateDistance = async () => {
//         const startCoords = await fetchCoordinates(startAddress);
//         const endCoords = await fetchCoordinates(endAddress);

//         if (!startCoords || !endCoords) {
//             setDistance(null);
//             return;
//         }

//         const distance = calculateDistanceBetweenPoints(
//             // Elle calcule la dastance entre deux points dans la terre
//             startCoords.lat, // En savant le latitude et le longtitude de chaque point خط العرض
//             startCoords.lon,
//             endCoords.lat,
//             endCoords.lon
//         );

//         setDistance(distance * (tripType === "Aller retour" ? 2 : 1));
//     };

//     const fetchCoordinates = async (address) => {
//         try {
//             const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//                 address
//             )}&format=json`;

//             // Fetch coordinates from the Nominatim API
//             const response = await fetch(url);
//             const data = await response.json();

//             // Extract latitude and longitude from the first result
//             const { lat, lon } = data[0];

//             return { lat, lon };
//         } catch (error) {
//             console.error("Error fetching coordinates:", error);
//             return null;
//         }
//     };

//     const calculateDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
//         const earthRadius = 6371; // Radius of the Earth in km  |  نصف قطر الأرض

//         const dLat = degToRad(lat2 - lat1);
//         const dLon = degToRad(lon2 - lon1);

//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(degToRad(lat1)) *
//                 Math.cos(degToRad(lat2)) *
//                 Math.sin(dLon / 2) *
//                 Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = earthRadius * c;

//         return distance;
//     };

//     const degToRad = (degrees) => {
//         return degrees * (Math.PI / 180);
//     };
//     // const handleSubmit = (e) =>{
//     //     e.preventDefault()
//     // }
//     return (
//         <div className="content">
//             <h1>Ajouter un trajet</h1>
//             <div className="inserts-t shadow-sm">
//                 <form>
//                     <div className="form-group">
//                         <label>Nom employé</label>
//                         <select className="form-select">
//                             <option value="">Selectionner nom employe</option>
//                             <option value="Bakhtaoui">Bakhtaoui</option>
//                             <option value="Ziko">Ziko</option>
//                             <option value="Touhs">Touhs</option>
//                             <option value="Hicham">Hicham</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Véhicule</label>
//                         <select className="form-select">
//                             <option value="">Selectionner vehicule</option>
//                             <option value="GU5783">GU5783</option>
//                             <option value="RB5435">RB5435</option>
//                             <option value="TU75843">TU75843</option>
//                             <option value="G45464">G45464</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Type de trajet</label>
//                         <select
//                             className="form-select"
//                             value={tripType}
//                             onChange={(e) => setTripType(e.target.value)}
//                         >
//                             <option value="">
//                                 Selectionner type de trajet
//                             </option>
//                             <option value="Aller">Aller</option>
//                             <option value="Aller retour">Aller retour</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Lieu début trajet</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Lieu début trajet"
//                             value={startAddress}
//                             onChange={handleStartChange}
//                         />
//                         <ul className="suggestions" style={{ paddingLeft: 0 }}>
//                             {startSuggestions.map((suggestion) => (
//                                 <li
//                                     key={suggestion.place_id}
//                                     onClick={() =>
//                                         handleSelectPlace(
//                                             suggestion.display_name,
//                                             setStartAddress,
//                                             setStartSuggestions
//                                         )
//                                     }
//                                 >
//                                     <i className="bi bi-geo-alt-fill"></i>{" "}
//                                     {suggestion.display_name}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="form-group">
//                         <label>Lieu fin trajet</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Lieu fin trajet"
//                             value={endAddress}
//                             onChange={handleEndChange}
//                         />
//                         <ul className="suggestions" style={{ paddingLeft: 0 }}>
//                             {endSuggestions.map((suggestion) => (
//                                 <li
//                                     key={suggestion.place_id}
//                                     onClick={() =>
//                                         handleSelectPlace(
//                                             suggestion.display_name,
//                                             setEndAddress,
//                                             setEndSuggestions
//                                         )
//                                     }
//                                 >
//                                     <i className="bi bi-geo-alt-fill"></i>{" "}
//                                     {suggestion.display_name}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="form-group">
//                         <label>Environ total KM</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Environ total KM"
//                             value={distance !== null ? distance.toFixed(2) : ""}
//                             readOnly
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Date début trajet</label>
//                         <input
//                             type="date"
//                             className="form-control"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Date fin trajet</label>
//                         <input
//                             type="date"
//                             className="form-control"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Status trajet</label>
//                         <select
//                             className="form-select"
//                             value={status}
//                             onChange={(e) => setStatus(e.target.value)}
//                         >
//                             <option value="">Selectionner status trajet</option>
// <option value="Pas encore commence">
//     Pas encore commence
// </option>
// <option value="Termine">Termine</option>
// <option value="En cours">En cours</option>
// <option value="Annule">Annule</option>
//                         </select>
//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         Ajouter trajet
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddTrajet;

// import { useState, useEffect } from "react";
// import axiosAdmin from "@/axios-admin";
// import { useNavigate, useParams } from "react-router-dom";
// import { PulseLoader } from "react-spinners";
// import { useAlert } from "react-alert";

// const AddTrajet = () => {
//     const { id_trajet } = useParams();
//     const navigate = useNavigate();
//     const alert = useAlert();

//     const [form, setForm] = useState({
//         employeeId: "",
//         vehicleId: "",
//         tripType: "",
//         startAddress: "",
//         endAddress: "",
//         startDate: "",
//         endDate: "",
//         status: "",
//         distance: 0,
//     });

//     const [employees, setEmployees] = useState([]);
//     const [vehicles, setVehicles] = useState([]);
//     const [startSuggestions, setStartSuggestions] = useState([]);
//     const [endSuggestions, setEndSuggestions] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true);
//         async function fetchData() {
//             try {
//                 const [employeeResponse, vehicleResponse] = await Promise.all([
//                     axiosAdmin.get("/employes"),
//                     axiosAdmin.get("/vehicules"),
//                 ]);
//                 setEmployees(employeeResponse.data || []);
//                 setVehicles(vehicleResponse.data || []);
//             } catch (error) {
//                 alert.error("Error fetching data");
//             }
//             setLoading(false);
//         }
//         fetchData();
//     }, [alert]);

//     useEffect(() => {
//         if (form.startAddress && form.endAddress && form.tripType) {
//             calculateDistance();
//         }
//     }, [form.startAddress, form.endAddress, form.tripType, endSuggestions]);

//     const handleStartChange = (value) => {
//         setForm(prev => ({ ...prev, startAddress: value }));
//         fetchSuggestions(value, setStartSuggestions);
//     };

//     const handleEndChange = (value) => {
//         setForm(prev => ({ ...prev, endAddress: value }));
//         fetchSuggestions(value, setEndSuggestions);
//     };

//     const handleSelectPlace = (address, which) => {
//         setForm(prevForm => ({ ...prevForm, [which]: address }));
//         setStartSuggestions([]);
//         setEndSuggestions([]);
//     };

//     const fetchSuggestions = async (query, setSuggestionsFunction) => {
//         try {
//             // Construct the request URL
//             const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//                 query
//             )}&format=json`;

//             // Fetch suggestions from the Nominatim API
//             const response = await fetch(url);
//             const data = await response.json();

//             return data;
//         } catch (error) {
//             console.error("Error fetching suggestions:", error);
//             return [];
//         }
//     };

//     const calculateDistance = async () => {
//         const startCoords = await fetchCoordinates(form.startAddress);
//         const endCoords = await fetchCoordinates(form.endAddress);

//         if (!startCoords || !endCoords) {
//             setForm(null);
//             return;
//         }

//         const distance = calculateDistanceBetweenPoints(
//             // Elle calcule la dastance entre deux points dans la terre
//             startCoords.lat, // En savant le latitude et le longtitude de chaque point خط العرض
//             startCoords.lon,
//             endCoords.lat,
//             endCoords.lon
//         );

//         setForm(prevForm => {
//             const newDistance = calculateDistanceBetweenPoints(
//                 startCoords.lat,
//                 startCoords.lon,
//                 endCoords.lat,
//                 endCoords.lon
//             );
//             return {
//                 ...prevForm,
//                 distance: newDistance * (prevForm.tripType === "Aller retour" ? 2 : 1),
//             };
//         });
//     };

//     const fetchCoordinates = async (address) => {
//         try {
//             const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//                 address
//             )}&format=json`;

//             // Fetch coordinates from the Nominatim API
//             const response = await fetch(url);
//             const data = await response.json();

//             // Extract latitude and longitude from the first result
//             const { lat, lon } = data[0];

//             return { lat, lon };
//         } catch (error) {
//             console.error("Error fetching coordinates:", error);
//             return null;
//         }
//     };

//     const calculateDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
//         const earthRadius = 6371; // Radius of the Earth in km  |  نصف قطر الأرض

//         const dLat = degToRad(lat2 - lat1);
//         const dLon = degToRad(lon2 - lon1);

//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(degToRad(lat1)) *
//                 Math.cos(degToRad(lat2)) *
//                 Math.sin(dLon / 2) *
//                 Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = earthRadius * c;

//         return distance;
//     };

//     const degToRad = (degrees) => {
//         return degrees * (Math.PI / 180);
//     };

//     // Handlers and functions related to suggestions and distance calculation go here...
//     // Ensure they manipulate the 'form' state appropriately.

//     // Form submission handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const method = id_trajet ? 'put' : 'post';
//             const url = id_trajet ? `/trajets/${id_trajet}` : '/trajets';
//             await axiosAdmin[method](url, form);
//             alert.success(`Trajet ${id_trajet ? 'updated' : 'added'} successfully!`);
//             navigate("/trajets");
//         } catch (error) {
//             alert.error(`Failed to ${id_trajet ? 'update' : 'add'} the trajet: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="content">
//             <h1>{id_trajet ? "Edit Trajet" : "Add Trajet"}</h1>
//             {loading ? (
//                 <PulseLoader color="#369bd6" />
//             ) : (
//                 <div className="inserts-t shadow-sm">
//                     <form onSubmit={handleSubmit}>
//                     {/* All your form fields should go here, including the select for employees and vehicles */}
//                     <div className="form-group">
//                         <label>Start Address</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Start Address"
//                             value={form.startAddress}
//                             onChange={(e) => handleStartChange(e.target.value)}
//                         />
//                         {/* ... */}
//                     </div>
//                     {/* ... rest of your form groups */}
//                     <button type="submit" className="btn btn-primary">
//                         {id_trajet ? "Update Trajet" : "Create Trajet"}
//                     </button>
//                 </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddTrajet;

// import { useState, useEffect } from "react";
// import axiosAdmin from "@/axios-admin";
// import { useNavigate, useParams } from "react-router-dom";
// import { PulseLoader } from "react-spinners";
// import { useAlert } from "react-alert";

// const AddTrajet = () => {
//     const { id_trajet } = useParams();
//     const navigate = useNavigate();
//     const alert = useAlert();

//     const [form, setForm] = useState({
//         employeeId: "",
//         vehicleId: "",
//         tripType: "",
//         startAddress: "",
//         endAddress: "",
//         startDate: "",
//         endDate: "",
//         status: "",
//         distance: 0,
//     });

//     const [employees, setEmployees] = useState([]);
//     const [vehicles, setVehicles] = useState([]);
//     const [startSuggestions, setStartSuggestions] = useState([]);
//     const [endSuggestions, setEndSuggestions] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(true);
//         async function fetchData() {
//             try {
//                 const employeeRes = await axiosAdmin.get("/employes");
//                 const vehicleRes = await axiosAdmin.get("/vehicules");

//                 // Assuming the API returns an object with a data property that is an array.
//                 setEmployees(employeeRes.data.data || []); // Make sure data.data is the correct path to your array
//                 setVehicles(vehicleRes.data.data || []); // Same here for vehicles
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 alert.error("Error fetching data: " + error.message);
//             }
//             setLoading(false);
//         }
//         fetchData();
//     }, [alert]);

//     useEffect(() => {
//         if (id_trajet) {
//             axiosAdmin
//                 .get(`/trajets/${id_trajet}`)
//                 .then((response) => {
//                     setForm(response.data);
//                 })
//                 .catch((error) => {
//                     alert.error(
//                         "Failed to fetch trajet details: " + error.message
//                     );
//                 });
//         }
//     }, [id_trajet]);

//     useEffect(() => {
//         if (form.startAddress && form.endAddress) { // Check if both addresses are present
//             calculateDistance(); // Call the distance calculation function
//         }
//     }, [form.startAddress, form.endAddress]); // Dependencies array to re-run the effect when addresses change

//     const calculateDistance = async () => {
//         if (!form.startAddress || !form.endAddress) return; // Ensure both addresses are present

//         const startCoords = await fetchCoordinates(form.startAddress);
//         const endCoords = await fetchCoordinates(form.endAddress);

//         if (startCoords && endCoords) { // Check if coordinates were fetched successfully
//             const distance = calculateDistanceBetweenPoints(startCoords, endCoords);
//             setForm(prevForm => ({
//                 ...prevForm,
//                 distance: distance * (prevForm.tripType === "Aller retour" ? 2 : 1),
//             }));
//         }
//     };

//     const handleAddressChange = (value, field) => {
//         setForm((prevForm) => ({ ...prevForm, [field]: value }));
//         if (value.length > 3) {
//             // Typically, you start searching after a few characters have been typed
//             fetchSuggestions(
//                 value,
//                 field === "startAddress"
//                     ? setStartSuggestions
//                     : setEndSuggestions
//             );
//         } else {
//             // Clear suggestions if the input length is reduced below the threshold
//             field === "startAddress"
//                 ? setStartSuggestions([])
//                 : setEndSuggestions([]);
//         }
//     };

//     const fetchSuggestions = async (query, setSuggestions) => {
//         const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//             query
//         )}&format=json&limit=5`;
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             setSuggestions(data);
//         } catch (error) {
//             console.error("Error fetching suggestions: ", error);
//             setSuggestions([]);
//         }
//     };

//     const handleSelectPlace = (address, field) => {
//         setForm((prevForm) => ({ ...prevForm, [field]: address }));
//         if (field === "startAddress") {
//             setStartSuggestions([]);
//         } else {
//             setEndSuggestions([]);
//         }
//     };

//     // const calculateDistance = async () => {
//     //     const startCoords = await fetchCoordinates(form.startAddress);
//     //     const endCoords = await fetchCoordinates(form.endAddress);
//     //     if (startCoords && endCoords) {
//     //         const distance = calculateDistanceBetweenPoints(
//     //             startCoords,
//     //             endCoords
//     //         );
//     //         setForm((prevForm) => ({
//     //             ...prevForm,
//     //             distance:
//     //                 distance * (prevForm.tripType === "Aller retour" ? 2 : 1),
//     //         }));
//     //     }
//     // };

//     const fetchCoordinates = async (address) => {
//         const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//             address
//         )}&format=json&limit=1`;
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             if (data.length > 0) {
//                 const { lat, lon } = data[0];
//                 return { lat, lon };
//             }
//         } catch (error) {
//             console.error("Error fetching coordinates: ", error);
//         }
//         return null;
//     };

//     const calculateDistanceBetweenPoints = (start, end) => {
//         const degToRad = (deg) => (deg * Math.PI) / 180.0;
//         const earthRadiusKm = 6371;
//         const dLat = degToRad(end.lat - start.lat);
//         const dLon = degToRad(end.lon - start.lon);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.sin(dLon / 2) *
//                 Math.sin(dLon / 2) *
//                 Math.cos(degToRad(start.lat)) *
//                 Math.cos(degToRad(end.lat));
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         return earthRadiusKm * c;
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         await calculateDistance();
//         try {
//             const method = id_trajet ? "put" : "post";
//             const url = id_trajet ? `/trajets/${id_trajet}` : "/trajets";
//             await axiosAdmin[method](url, form);
//             alert.success(
//                 `Trajet ${id_trajet ? "updated" : "added"} successfully!`
//             );
//             navigate("/trajets");
//         } catch (error) {
//             alert.error(
//                 `Failed to ${id_trajet ? "update" : "add"} the trajet: ${
//                     error.message
//                 }`
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="content">
//             <h1>{id_trajet ? "Edit Trajet" : "Add Trajet"}</h1>
//             {loading ? (
//                 <PulseLoader color="#369bd6" />
//             ) : (
//                 <div className="inserts-t shadow-sm">
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="employeeId">Nom employé</label>
//                             <select
//                                 id="employeeId"
//                                 className="form-control"
//                                 value={form.employeeId}
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         employeeId: e.target.value,
//                                     })
//                                 }
//                             >
//                                 <option value="">
//                                     Selectionner nom employe
//                                 </option>
//                                 {employees.map((emp) => (
//                                     <option key={emp.id} value={emp.id}>
//                                         {emp.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="vehicleId">Véhicule</label>
//                             <select
//                                 id="vehicleId"
//                                 className="form-control"
//                                 value={form.vehicleId}
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         vehicleId: e.target.value,
//                                     })
//                                 }
//                             >
//                                 <option value="">Selectionner vehicule</option>
//                                 {vehicles.map((vehicle) => (
//                                     <option key={vehicle.id} value={vehicle.id}>
//                                         {vehicle.matricule}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         {/* Existing form fields for startAddress, endAddress, and distance */}
//                         {/* ... */}
//                         <div className="form-group">
//                             <label>Start Address</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Start Address"
//                                 value={form.startAddress}
//                                 onChange={(e) =>
//                                     handleAddressChange(
//                                         e.target.value,
//                                         "startAddress"
//                                     )
//                                 }
//                             />
//                             <ul
//                                 className="suggestions"
//                                 style={{ paddingLeft: 0 }}
//                             >
//                                 {startSuggestions.map((sug) => (
//                                     <li
//                                         key={sug.place_id}
//                                         onClick={() =>
//                                             handleSelectPlace(
//                                                 sug.display_name,
//                                                 "startAddress"
//                                             )
//                                         }
//                                     >
//                                         {sug.display_name}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="form-group">
//     <label>End Address</label>
//     <input
//         type="text"
//         className="form-control"
//         placeholder="End Address"
//         value={form.endAddress}
//         onChange={(e) => handleAddressChange(e.target.value, 'endAddress')}
//     />
//     <ul className="suggestions" style={{ paddingLeft: 0 }}>
//         {endSuggestions.map((suggestion) => (
//             <li key={suggestion.place_id} onClick={() => handleSelectPlace(suggestion.display_name, 'endAddress')}>
//                 {suggestion.display_name}
//             </li>
//         ))}
//     </ul>
// </div>
//                         <div className="form-group">
//                             <label htmlFor="distance">Distance (km)</label>
//                             <input
//                                 type="text"
//                                 id="distance"
//                                 className="form-control"
//                                 value={
//                                     form.distance ? form.distance.toFixed(2) : ""
//                                 }
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="tripType">Type de trajet</label>
//                             <select
//                                 id="tripType"
//                                 className="form-control"
//                                 value={form.tripType}
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         tripType: e.target.value,
//                                     })
//                                 }
//                             >
//                                 <option value="">
//                                     Selectionner type de trajet
//                                 </option>
//                                 <option value="Aller">Aller</option>
//                                 <option value="Aller-Retour">
//                                     Aller-Retour
//                                 </option>
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="startDate">Date début trajet</label>
//                             <input
//                                 type="date"
//                                 id="startDate"
//                                 className="form-control"
//                                 value={form.startDate}
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         startDate: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="endDate">Date fin trajet</label>
//                             <input
//                                 type="date"
//                                 id="endDate"
//                                 className="form-control"
//                                 value={form.endDate}
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         endDate: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="status">Status trajet</label>
//                             <select
//                                 id="status"
//                                 className="form-control"
//                                 value={form.status}
//                                 onChange={(e) =>
//                                     setForm({ ...form, status: e.target.value })
//                                 }
//                             >
//                                 <option value="">
//                                     Selectionner status trajet
//                                 </option>
//                                 <option value="En cours">En cours</option>
//                                 <option value="Terminé">Terminé</option>
//                                 <option value="Annulé">Annulé</option>
//                             </select>
//                         </div>
//                         <button type="submit" className="btn btn-primary">
//                             {id_trajet ? "Modifier trajet" : "Ajouter trajet"}
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddTrajet;

import { useState, useEffect } from "react";
import axiosAdmin from "@/axios-admin";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAlert } from "react-alert";

const AddTrajet = () => {
    const { id_trajet } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    const [form, setForm] = useState({
        employe_id: "",
        id_vehicule: "",
        type: "",
        lieu_debut_trajet: "",
        lieu_fin_trajet: "",
        environ_total: 0,
        date_debut_trajet: "",
        date_fin_trajet: "",
        status: "",
    });

    const [employees, setEmployees] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axiosAdmin.get("/vehicule?etat_de_vehicule=Disponible"),
            axiosAdmin.get("/employe?etat_employe=Disponible"),
        ])
            .then(([vehiclesResponse, employeesResponse]) => {
                const availableVehicles = vehiclesResponse.data.data || [];
                setVehicles(
                    availableVehicles.filter(
                        (v) => v.etat_de_vehicule === "Disponible"
                    )
                );
                const availableEmployes = employeesResponse.data.data || [];
                setEmployees(
                    availableEmployes.filter(
                        (v) => v.etat_employe === "Disponible"
                    )
                );

                if (id_trajet) {
                    axiosAdmin
                        .get(`/trajets/${id_trajet}`)
                        .then(({ data }) => {
                            setForm({
                                ...data,
                                id_vehicule: data.vehicule?.id_vehicule,
                                employe_id: data.employe?.id,
                            });
                        })
                        .catch((error) => {
                            console.error(
                                "Failed to load trajet details:",
                                error
                            );
                            alert.error("Failed to load trajet details");
                        })
                        .finally(() => setLoading(false));
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Failed to load initial data:", error);
                alert.error("Failed to load initial data");
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_trajet, alert, axiosAdmin]);

    // useEffect(() => {
    //     setLoading(true);
    //     async function fetchData() {
    //         try {
    //             const employeeRes = await axiosAdmin.get("/employe");
    //             if (employeeRes.data && employeeRes.data.data) {
    //                 setEmployees(employeeRes.data.data);
    //                 console.log("Employees fetched:", employeeRes.data.data);
    //             } else {
    //                 throw new Error("Unexpected response structure");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching employees:", error);
    //             alert.error("Error fetching data: " + error.message);
    //         }
    //         setLoading(false);
    //     }
    //     fetchData();
    // }, [alert]);

    // useEffect(() => {
    //     setLoading(true);
    //     async function fetchData() {
    //         try {
    //             // const employeeRes = await axiosAdmin.get("/employes");
    //             // // console.log("Employee Response:", employeeRes.data);
    //             // setEmployees(employeeRes.data.data || []);
    //             const vehicleRes = await axiosAdmin.get("/vehicule");
    //             setVehicles(vehicleRes.data.data || []);
    //             console.log("Vehicules: ", vehicles);
    //             console.log("Employees: ",employees);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             alert.error("Error fetching data: " + error.message);
    //         }
    //         setLoading(false);
    //     }
    //     fetchData();
    // }, [alert]);

    // useEffect(() => {
    //     if (id_trajet) {
    //         axiosAdmin
    //             .get(`/trajets/${id_trajet}`)
    //             .then((response) => setForm(response.data))
    //             .catch((error) =>
    //                 alert.error(
    //                     "Failed to fetch trajet details: " + error.message
    //                 )
    //             );
    //     }
    // }, [id_trajet, alert]);

    useEffect(() => {
        const calculateAndUpdateDistance = async () => {
            if (form.lieu_debut_trajet && form.lieu_fin_trajet) {
                const startCoords = await fetchCoordinates(
                    form.lieu_debut_trajet
                );
                const endCoords = await fetchCoordinates(form.lieu_fin_trajet);
                if (startCoords && endCoords) {
                    let baseDistance = calculateDistanceBetweenPoints(
                        startCoords,
                        endCoords
                    );
                    // Apply the trip type multiplier
                    const environ_total =
                        form.type === "Aller retour"
                            ? baseDistance * 2
                            : baseDistance;
                    setForm((prevForm) => ({
                        ...prevForm,
                        environ_total: form.type ? environ_total : 0, // Only set distance if trip type is selected
                    }));
                }
            }
        };

        calculateAndUpdateDistance();
    }, [form.lieu_debut_trajet, form.lieu_fin_trajet, form.type]);

    const handleAddressChange = (value, field) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
        if (value.length > 3) {
            fetchSuggestions(
                value,
                field === "lieu_debut_trajet"
                    ? setStartSuggestions
                    : setEndSuggestions
            );
        } else {
            field === "lieu_debut_trajet"
                ? setStartSuggestions([])
                : setEndSuggestions([]);
        }
    };

    const fetchSuggestions = async (query, setSuggestions) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
        )}&format=json&limit=5`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        }
    };

    const calculateDistance = async () => {
        if (form.lieu_debut_trajet && form.lieu_fin_trajet && form.type) {
            const startCoords = await fetchCoordinates(form.lieu_debut_trajet);
            const endCoords = await fetchCoordinates(form.lieu_fin_trajet);
            if (startCoords && endCoords) {
                let baseDistance = calculateDistanceBetweenPoints(
                    startCoords,
                    endCoords
                );
                // Apply the trip type multiplier
                const environ_total =
                    form.type === "Aller retour"
                        ? baseDistance * 2
                        : baseDistance;
                setForm((prevForm) => ({
                    ...prevForm,
                    environ_total,
                }));
            }
        } else {
            // Reset distance if the trip type is not selected or addresses are not complete
            setForm((prevForm) => ({
                ...prevForm,
                environ_total: 0,
            }));
        }
    };

    const fetchCoordinates = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
        )}&format=json&limit=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { lat, lon };
            }
        } catch (error) {
            console.error("Error fetching coordinates: ", error);
        }
        return null;
    };

    const calculateDistanceBetweenPoints = (start, end) => {
        const degToRad = (deg) => (deg * Math.PI) / 180;
        const earthRadiusKm = 6371;
        const dLat = degToRad(end.lat - start.lat);
        const dLon = degToRad(end.lon - start.lon);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degToRad(start.lat)) *
                Math.cos(degToRad(end.lat)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    };

    const handleSelectPlace = (selectedAddress, field) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: selectedAddress,
        }));
        if (field === "lieu_debut_trajet") {
            setStartSuggestions([]);
        } else {
            setEndSuggestions([]);
        }
        // Trigger distance calculation if both addresses are filled
        if (
            (field === "lieu_debut_trajet" && form.lieu_fin_trajet) ||
            (field === "lieu_fin_trajet" && form.lieu_debut_trajet)
        ) {
            calculateDistance(); // Call this function to ensure distance updates with the selected place
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await calculateDistance(); // Make sure distance calculation is up to date

        // Prepare the payload by mapping the component's state to the database fields
        const payload = {
            id_vehicule: form.id_vehicule,
            type: form.type,
            lieu_debut_trajet: form.lieu_debut_trajet,
            lieu_fin_trajet: form.lieu_fin_trajet,
            date_debut_trajet: form.date_debut_trajet,
            date_fin_trajet: form.date_fin_trajet,
            status: form.status,
            environ_total: form.environ_total,
            id: form.employe_id, // Map employe_id from the component to id for the backend
        };

        try {
            const method = id_trajet ? "put" : "post";
            const url = id_trajet ? `/trajets/${id_trajet}` : "/trajets";
            await axiosAdmin[method](url, payload);
            alert.success(
                `Trajet ${id_trajet ? "modifié" : "ajouté"}  avec succès.`
            );
            navigate("/trajets");
        } catch (error) {
            console.error("Failed to submit trajet:", error);
            // Handle the error details here
            alert.error(
                `impossible de ${id_trajet ? "modifié" : "ajouté"} le trajet: ${
                    error.response?.data?.message || error.message
                }`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content">
            {loading ? (
                <div style={{ marginTop: "-16px", paddingTop: "1px" }}>
                    <PulseLoader
                        color="#369bd6"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "15em",
                        }}
                    />
                </div>
            ) : (
                <>
                    <h1>
                        {id_trajet ? "Modifier trajet" : "Ajouter un trajet"}
                    </h1>
                    <div className="inserts-t shadow-sm">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nom employé</label>
                                <select
                                    id="employe_id"
                                    className="form-control"
                                    value={form.employe_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employe_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">
                                        Selectionner nom employe
                                    </option>
                                    {employees.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.nom} {emp.prenom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="id_vehicule">Véhicule</label>
                                <select
                                    id="id_vehicule"
                                    className="form-control"
                                    value={form.id_vehicule}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            id_vehicule: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">
                                        Selectionner vehicule
                                    </option>
                                    {vehicles.map((vehicle) => (
                                        <option
                                            key={vehicle.id_vehicule}
                                            value={vehicle.id_vehicule}
                                        >
                                            {vehicle.matricule}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type de trajet</label>
                                <select
                                    id="type"
                                    className="form-control"
                                    value={form.type}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            type: e.target.value,
                                        });
                                        // Optionally trigger distance calculation directly here if addresses are set
                                        if (
                                            form.lieu_debut_trajet &&
                                            form.lieu_fin_trajet
                                        ) {
                                            calculateDistance();
                                        }
                                    }}
                                >
                                    <option value="">
                                        Selectionner type de trajet
                                    </option>
                                    <option value="Aller">Aller</option>
                                    <option value="Aller retour">
                                        Aller-Retour
                                    </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Lieu début trajet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Lieu debut trajet"
                                    value={form.lieu_debut_trajet}
                                    onChange={(e) =>
                                        handleAddressChange(
                                            e.target.value,
                                            "lieu_debut_trajet"
                                        )
                                    }
                                />
                                <ul
                                    className="suggestions"
                                    style={{ paddingLeft: 0 }}
                                >
                                    {startSuggestions.map((sug) => (
                                        <li
                                            key={sug.place_id}
                                            onClick={() =>
                                                handleSelectPlace(
                                                    sug.display_name,
                                                    "lieu_debut_trajet"
                                                )
                                            }
                                        >
                                            <i className="bi bi-geo-alt-fill"></i>{" "}
                                            {sug.display_name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="form-group">
                                <label>Lieu fin trajet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Lieu fin trajet"
                                    value={form.lieu_fin_trajet}
                                    onChange={(e) =>
                                        handleAddressChange(
                                            e.target.value,
                                            "lieu_fin_trajet"
                                        )
                                    }
                                />
                                <ul
                                    className="suggestions"
                                    style={{ paddingLeft: 0 }}
                                >
                                    {endSuggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.place_id}
                                            onClick={() =>
                                                handleSelectPlace(
                                                    suggestion.display_name,
                                                    "lieu_fin_trajet"
                                                )
                                            }
                                        >
                                            <i className="bi bi-geo-alt-fill"></i>{" "}
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="form-group">
                                <label>Environ total (km)</label>
                                <input
                                    type="text"
                                    id="environ_total"
                                    className="form-control"
                                    placeholder="Environ total (km)"
                                    value={
                                        form.environ_total
                                            ? form.environ_total.toFixed(2)
                                            : ""
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Date début trajet</label>
                                <input
                                    type="date"
                                    id="date_debut_trajet"
                                    className="form-control"
                                    value={form.date_debut_trajet}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            date_debut_trajet: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date_fin_trajet">
                                    Date fin trajet
                                </label>
                                <input
                                    type="date"
                                    id="date_fin_trajet"
                                    className="form-control"
                                    value={form.date_fin_trajet}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            date_fin_trajet: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status trajet</label>
                                <select
                                    id="status"
                                    className="form-control"
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">
                                        Selectionner status trajet
                                    </option>
                                    <option value="Pas encore commence">
                                        Pas encore commence
                                    </option>
                                    <option value="Termine">Termine</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Annule">Annule</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {id_trajet
                                    ? "Modifier trajet"
                                    : "Ajouter trajet"}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddTrajet;
