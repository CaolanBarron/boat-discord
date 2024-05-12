import ActivityService from "../../services/ActivityService";

const playerName = "Test";

describe("Stop phrases", () => {
  it("Should return correct phrase for fishing", () => {
    const response = ActivityService.stopPhrase("FISH", playerName);
    expect(response).toEqual(
      `Test packs away the fishing rod and contains their bait.`
    );
  });
  it("Should return correct phrase for cartography", () => {
    const response = ActivityService.stopPhrase("CARTOGRAPHY", playerName);
    expect(response).toEqual(
      `Test puts away their papers and instruments. Perhaps they will try again later...`
    );
  });
  it("Should return correct phrase for repair", () => {
    const response = ActivityService.stopPhrase("REPAIR", playerName);
    expect(response).toEqual(
      `Test puts away their tools and washes the unpleasant oil off their hands.`
    );
  });
  it("Should return correct phrase for research", () => {
    const response = ActivityService.stopPhrase("RESEARCH", playerName);
    expect(response).toEqual(
      `Test cleans their beakers as best they can and gives their brain some rest.`
    );
  });
  it("Should return correct phrase for sailing", () => {
    const response = ActivityService.stopPhrase("SAILING", playerName);
    expect(response).toEqual(
      `Test unhands the helm and turns their eyes from the horizon.`
    );
  });
  it("Should throw an error on an activity that does not exist", () => {
    expect(() => ActivityService.stopPhrase("INCORRECT", playerName)).toThrow(
      "This activity key INCORRECT does not exist"
    );
  });
});
