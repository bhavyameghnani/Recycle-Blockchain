pragma solidity ^0.5.0;

contract Recycle {
  uint public recycleCount = 0;
  
  // Structure of Recyclable Items which has unique ID, details, image location, its original points and owner
  struct RecycleItem {
    uint id;
    string title;
    string imageLocation;
    string location;
    string impact;
    string company;
    uint points;
    address owner;
  }
  
  mapping(uint => RecycleItem) public recycleitem;
  
  event RecycleItemCreated(
    uint id,
    string title,
    string imageLocation,
    string location,
    string impact,
    string company,
    uint points,
    address owner
  );
  
  constructor() public {
    //createRecycleItem();
  }

  function createRecycleItem(string memory _title, string memory _imageLocation, string memory _location, string memory _impact, string memory _company, uint _points) public {
    address _owner = msg.sender;
    recycleitem[recycleCount] = RecycleItem(recycleCount, _title, _imageLocation, _location, _impact, _company, _points, _owner);
    emit RecycleItemCreated(recycleCount, _title, _imageLocation, _location, _impact, _company, _points, _owner);
    recycleCount ++; 
  }
}