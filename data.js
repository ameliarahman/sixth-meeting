const data = [
    {
      id: "clj2k4u62021l0872l5005sgr",
      name: "M. Asror",
      nim: "M010001",
      address: "Madiun"
    },
    {
      id: "clj2kasoz028b0872zqir86qr",
      name: "M. Farhan",
      nim: "M010002",
      address: "Jambi"
    },
    {
      id: "clj2k7jq4025r0872ka031aam",
      name: "Laili AR",
      nim: "M010003",
      address: "Magetan"
    },
    {
      id: "ckacmayji9qmx33jmns1",
      name: "Azzahra Kareena",
      nim: "M010004",
      address: "Madiun"
    }
  ];
  
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
  