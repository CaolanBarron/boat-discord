import FishService from "../../services/Commands/FishService";
import InitializeTestDb from "../utils/database";
import schedule from "node-schedule";

beforeEach(() => {
  InitializeTestDb();
});

afterAll(async () => {
  await schedule.gracefulShutdown();
});

const player = {
  id: 1,
  name: "John",
};

describe("Fishing Start Activity", () => {
  it("Starts correctly", async () => {
    const response = await FishService.start(1, player);

    expect(response.content).toEqual(
      "John has taken the fishing rod and cast it into the water, they wait patiently..."
    );

    expect(response.ephemeral).toBeFalsy();
  });

  it("Message for wanting to fish when fishing", async () => {
    await FishService.start(1, player);

    const response = await FishService.start(1, player);

    expect(response.content).toEqual("You are already fishing!");

    expect(response.ephemeral).toBeTruthy();
  });

  it("Message for wanting to fish when doing another activity", async () => {
    // TODO: Implement this test when other Activity commands are created
    expect(true).toBe(false);
  });
});

const fishKeys = [
  "GAS_FISH",
  "TROUT",
  "BOOT",
  "SALMON",
  "STURGEON",
  "LAVA_FISH",
];

describe("Fishing Job Activity", () => {
  it("Return a valid item on job finish", async () => {
    const catches = await FishService.endJob(1, player);
    expect(fishKeys).toContain(catches.key);
  });

  it("Job finish removes activity from database", async () => {
    await FishService.start(1, player);
    await FishService.endJob(1, player);
    const response = await FishService.start(1, player);
    expect(response.content).toEqual(
      "John has taken the fishing rod and cast it into the water, they wait patiently..."
    );
  });
});
