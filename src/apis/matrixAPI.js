import axios from 'axios';

const GEOAPIFY_API_KEY = 'b75f89d797d1423c8b532ac77cf8f47f';

const getCoordinates = async(address) => {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/search', {
        params: {
            text: address,
            apiKey: GEOAPIFY_API_KEY,
        }
    });
    const { features } = response.data;
    if (features.length > 0) {
        const { geometry } = features[0];
        return geometry.coordinates;
    }
    throw new Error('Unable to get coordinates for the address');
};

const getDistanceMatrix = async(sourceCoords, targetCoords) => {
    const response = await axios.post('https://api.geoapify.com/v1/routematrix', {
        mode: 'scooter',
        sources: [{ location: sourceCoords }],
        targets: targetCoords.map(coord => ({ location: [coord.longitude, coord.latitude] }))
    }, {
        params: {
            apiKey: GEOAPIFY_API_KEY,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data.sources_to_targets[0];
};

export const filterPostsWithinScope = async(address, listPost, scope) => {
    try {
        const sourceCoords = await getCoordinates(address);

        const targetCoords = listPost.map(post => ({
            latitude: post.latitude,
            longitude: post.longitude,
        }));

        const distances = await getDistanceMatrix(sourceCoords, targetCoords);

        const filteredPosts = listPost.map((post, index) => ({
            ...post,
            distance: distances[index].distance / 1000, // convert to kilometers
        })).filter(post => post.distance <= scope);

        return filteredPosts;
    } catch (error) {
        console.error(error);
        return [];
    }
};