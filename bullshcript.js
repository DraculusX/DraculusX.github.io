
/// Poster Click Stuff ////
async function somerandomStartActions() {
	const thisscene = BS.BanterScene.GetInstance();
	const waitingForUnity = async () => { while (!thisscene.unityLoaded) { await new Promise(resolve => setTimeout(resolve, 500)); } };
	await waitingForUnity(); console.log("BS: Unity-Loaded");
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
				'https://draculusx.github.io/Images/RaeRaeBday.jpg', // Button Image
				'https://draculusx.github.io/index.html', // Link to the Poster
				new BS.Vector3(0,0,0), // Local Rotation
				new BS.Vector3(.6,.6,.6), // Local Scale
				2, // Width
				1 // Height
			);
		// createButton // NAME // Button Position // posterImage // localRotation // Scale // Width // Height
  		createButton(
				'Test01', // Name of the Button
				new BS.Vector3(-5.46,2,-4), // Position of the Button
				'https://draculusx.github.io/Images/WGD.png', // Button Image
				'https://draculusx.github.io/index.html', // Link to the Poster
				new BS.Vector3(0,-90,0), // Local Rotation
				new BS.Vector3(.6,.6,.6), // Local Scale
				1, // Width
				1.4 // Height
			);
	}, 3000);
};

somerandomStartActions();
