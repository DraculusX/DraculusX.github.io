var youtubePlayList = "PLtVfX3-hK60MLwoGZ6LpaRp1tEcaKHeUs"; // YouTube Playlist ID

/// Poster Click Stuff ////
async function somerandomStartActions() {
	const thisscene = BS.BanterScene.GetInstance();
	const waitingForUnity = async () => { while (!thisscene.unityLoaded) { await new Promise(resolve => setTimeout(resolve, 500)); } };
	await waitingForUnity(); console.log("BS: Unity-Loaded");
	/* UNCOMMENT THIS TO ENABLE THE YOUTUBE PLAYER */
		enableYouTube();
	/* UNCOMMENT THIS TO ENABLE SCREEN CAST / YOUTUBE LIVE */
		// enableTheFireScreen();
	/* UNCOMMENT THIS TO ENABLE THE KARAOKE PLAYER */
		// enableKaraokePlayer();
	/* UNCOMMENT THIS TO ENABLE FIRE TABLET */
		enableThePortableFireScreen();
	setTimeout(() => { 
		//// Button Creator ///
		async function createButton(name, butPosition, buttonImage = null, posterLink, localRotation = new BS.Vector3(0,0,0), localScale = new BS.Vector3(1, 1, 1), width = 1, height = 1) {
			const buttonObject = await new BS.GameObject(`Button_${name}`).Async(); // Create the Object and give it a name
			await buttonObject.AddComponent(new BS.BanterGeometry(BS.GeometryType.PlaneGeometry, 0, width, height)); // add geometry to the object
			await buttonObject.AddComponent(new BS.BanterMaterial('Unlit/Diffuse', buttonImage, new BS.Vector4(1, 1, 1, 1))); // Set the Shader (Unlit/Diffuse) and the Color (0.1, 0.1, 0.1, 0.7) 0.7 being the alpha / transparency 
			const buttonTransform = await buttonObject.AddComponent(new BS.Transform()); // Add a transform component so you can move and transform the object
			await buttonObject.AddComponent(new BS.MeshCollider(true)); // Add a mesh Collider for the clicking to work
			buttonObject.SetLayer(5); // Set the object to UI Layer 5 so it can be clicked
			buttonTransform.position = butPosition; // Set the Position of the object
			buttonTransform.localScale = localScale; // Set the Scale of the object
			buttonTransform.localEulerAngles = localRotation; // Set the Scale of the object
			buttonObject.On('click', () => {
				console.log(`Button clicked!`);
				openPage(posterLink);
			});
		}
	// NAME // Button Position // posterImage // localRotation // Scale // Width // Height
  		// createButton('Test01', new BS.Vector3(-1,2,-1), 'https://openclipart.org/image/800px/17880', 'https://firer.at/', new BS.Vector3(0,-90,0), new BS.Vector3(0.3, 0.3, 1), 2, 1 );
  		createButton(
				'Test01', // Name of the Button
				new BS.Vector3(2.75,1.65,2), // Position of the Button
				'https://draculusx.github.io/Images/WGD.png', // Button Image
				'https://draculusx.github.io/index.html', // Link to the Poster
				new BS.Vector3(0,0,0), // Local Rotation
				new BS.Vector3(.6,.6,.6), // Local Scale
				1, // Width
				1.4 // Height
			);
		// createButton // NAME // Button Position // posterImage // localRotation // Scale // Width // Height
  		createButton(
				'Test02', // Name of the Button
				new BS.Vector3(-5.49,2,-4.1), // Position of the Button
				'https://draculusx.github.io/Images/WGD.png', // Button Image
				'https://draculusx.github.io/index.html', // Link to the Poster
				new BS.Vector3(0,-90,0), // Local Rotation
				new BS.Vector3(.6,.6,.6), // Local Scale
				1, // Width
				1.4 // Height
			);
		// createButton // NAME // Button Position // posterImage // localRotation // Scale // Width // Height
  		createButton(
				'Test02', // Name of the Button
				new BS.Vector3(-9.5,2.8,-2.52), // Position of the Button
				'https://draculusx.github.io/Images/RazorCrop.png', // Button Image
				'https://draculusx.github.io/index.html', // Link to the Poster
				new BS.Vector3(0,-180,0), // Local Rotation
				new BS.Vector3(.6,.6,.6), // Local Scale
				1.4, // Width
				1 // Height
			);
	}, 3000);
};

/////////////// RENDER SCRIPT LOADER STUFF ///////////////
async function injectRenderScript(theScriptsURL, TheScriptsName = "UnNamed", attributes = {}, appendTo = document.body) {
  const scriptUrl = theScriptsURL;
  try { // 1. "Warm-up" request: Ping the server to wake it up.
    console.log("Waking up the server...");
    await fetch(scriptUrl, { method: 'HEAD', mode: 'no-cors' }); // We use { method: 'HEAD' } to be more efficient.
    console.log("Server is awake! Injecting script..."); // We only need to know the server is awake, not download the whole script yet.
    const script = document.createElement("script"); // 2. Inject the script now that the server is ready.
    script.id = `${TheScriptsName}`;
    script.setAttribute("src", scriptUrl); // Set the src attribute
    Object.entries(attributes).forEach(([key, value]) => { script.setAttribute(key, value); }); // Set all custom attributes
    appendTo.appendChild(script);
    script.onload = () => { console.log(`${TheScriptsName} script loaded successfully!`); }; // Set up event handlers
    script.onerror = () => { console.error(`Failed to load the ${TheScriptsName} script.`); };
  } catch (error) { // The fetch itself might fail, though 'no-cors' mode often prevents this.
    console.error("The warm-up request failed. The script might not load.", error); // The real check is the script's onerror handler.
  }
}

// Player Toggle's by FireRat
let ytplayerdisabled = true;
let karaokeplayerdisabled = true;
let screenstuffDisabled = true;

// Fire Tablet
let screenPortableDisabled = true;
function enableThePortableFireScreen(announce = true) {
  if (screenPortableDisabled){ screenPortableDisabled = false;
		console.log("Adding Fire Tablet");
		const firescreenAttributes = {
			"scale": "0.9 0.9 1",
			"mipmaps": "0",
			"rotation": "0 0 0",
			"position": "4.8 2 1.4",
			"pixelsperunit": "1300",
			"announce": "false",
			"announce-events": "true",
			"announce-420": "false",
			"volume": "0.25",
			"backdrop": "true",
			"hand-controls": "true",
			"button-color": "1 0 0 1",
			"volup-color": "0 1 0 1",
			"voldown-color": "1 1 0 1",
			"mute-color": "1 1 1 1",
			"custom-button01-url": "https://discord.gg/Q7uhhNrsuQ",
			"custom-button01-text": "Goth Night Discord",
			"custom-button02-url": "https://youtube.com/@razorsmiles",
			"custom-button02-text": "Razor's YouTube",
			"custom-button03-url": "https://discord.gg/bantaverse",
			"custom-button03-text": "Banter Discord",	   
			"custom-button04-url": "https://firer.at/pages/games.html",
			"custom-button04-text": "Games",
			"website": "https://draculusx.github.io/index.html"
		};
		const firescreen = document.createElement("script");
		firescreen.id = "gothnight-firetablet";
		firescreen.setAttribute("src", "https://firer.at/scripts/firescreenv2.js");
		Object.entries(firescreenAttributes).forEach(([key, value]) => { firescreen.setAttribute(key, value); });
		document.querySelector("a-scene").appendChild(firescreen);
  }; console.log("Fire Tablet enabled");
};

async function enableYouTube() {
	// If Browser already exists, DESTROY IT!
	var browser = await BS.BanterScene.GetInstance().Find('MainParentObject2');
	if (browser) { console.log("Browser2 Found, Removing it!"); cleanupFireScreenV2(2); screenstuffDisabled = true; }
	// If Karaoke Player exists, Destroy it!
	let delayYT = false;
	if (window.karaokePlayerInstance) { delayYT = true; karaokeplayerdisabled = true; console.log("Karaoke Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
	if (ytplayerdisabled){ ytplayerdisabled = false;
		setTimeout(() => {  
			console.log("YouTube Player Loading");

			const youtubeAttributes = {
				"scale": "3.25 3.25 3.25", // Scale of the YouTube Player
				"mip-maps": "0",
				"rotation": "0 180 0", // Rotation of the YouTube Player
				"position": "0 3.5 20.95", // Position of the YouTube Player
				"hand-controls": "false", // Hand Controls for the YouTube Player
				"button-position": "0 2.43 20.95", // Position of the YouTube Player Buttons
				"button-rotation": "0 180 0", // Rotation of the YouTube Player Buttons
				"button-scale": "0.69 0.69 0.69", // Scale of the YouTube Player Buttons
				"volume": "5", // Volume of the YouTube Player
				// "spatial": "true",
				"spatial-min-distance": "1", // Distance at which the sound will start to fade in
				"spatial-max-distance": "500", // Distance at which the sound will be audible
				"playlist": youtubePlayList, // YouTube Playlist ID
				"data-playlist-icon-url": "https://draculusx.github.io/Images/YT/Playlist.png",
				"data-vol-up-icon-url": "https://draculusx.github.io/Images/YT/VolUp.png",
				"data-vol-down-icon-url": "https://draculusx.github.io/Images/YT/VolDown.png",
				"data-mute-icon-url": "https://draculusx.github.io/Images/YT/Mute.png",
				"data-skip-forward-icon-url": "https://draculusx.github.io/Images/YT/Forward.png",
				"data-skip-backward-icon-url": "https://draculusx.github.io/Images/YT/Back.png",
				"announce": "false", // Announce players entering the space
				"instance": "blacknight", // Instance name for the YouTube Player
				"announce-events": "true", // Announce events when they are about to start
				"announce-four-twenty": "false" // Announce 4:20 events
			};

			injectRenderScript(
				"https://vidya.firer.at/playlist.js", // firer.at / sdq.st / best-v-player.glitch.me
				"fire-videoplayer", youtubeAttributes, document.querySelector("a-scene")
			);

		}, delayYT ? 2000 : 0);
  } else {console.log("YouTube Player Loading...");}
};


somerandomStartActions();
