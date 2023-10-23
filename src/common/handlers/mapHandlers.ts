export async function saveNewMap(mapData: any) {
  try {
    const response = await fetch('/api/maps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapData),
    });

    if (!response.ok) {
      throw new Error('Failed to add map');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding map:', error);
  }
}

export async function updateSavedMap(mapData: any) {
  try {
    const response = await fetch('/api/maps', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapData),
    });

    if (!response.ok) {
      throw new Error('Failed to update map');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating map:', error);
  }
}

export async function getUserMaps() {
  try {
    const response = await fetch('/api/maps');

    if (!response.ok) {
      throw new Error('Failed to get user maps');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting user maps:', error);
  }
}

export async function deleteMap(mapId: number) {
  try {
    const response = await fetch(`/api/maps`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mapId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete map');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting map:', error);
  }
}
