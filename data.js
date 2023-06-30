const data = [
{
    "id":1,
    "name":"Amelia Rahman",
    "nim":"M0512004"
},
{
    "id":2,
    "name":"Farhan Edit",
    "nim":"New M05120011"
},
{
    "id":4,
    "name":"Subekti Bimo",
    "nim":"New M0512009"
},
{
                           
    "id":5,
    "name":"Syahla",
    "nim":"M0512009"
},
{
    "id":6,
    "name":"Odi Frans",
    "nim":"M0512010"
}];

// Get all data
function getAllData() {
    return data;
  }
  
  // Get one data by ID
  function getOneData(id) {
    return data.find(item => item.id === id);
  }
  
  // Add data
  function addData(newItem) {
    data.push(newItem);
  }
  
  // Update data
  function updateData(id, updatedItem) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = updatedItem;
      return true;
    }
    return false;
  }
  
  // Delete data
  function deleteData(id) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      return true;
    }
    return false;
  }
  
  module.exports = {
    getAllData,
    getOneData,
    addData,
    updateData,
    deleteData
  };
  