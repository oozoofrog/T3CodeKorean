import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

import { resolveUserDataPath } from "./DesktopUserData.ts";

it.effect.each([false, true])(
  "isolates fork browser preferences without copying upstream credentials (dev=%s)",
  (isDevelopment) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const directory = yield* fs.makeTempDirectoryScoped({ prefix: "t3-fork-profile-" });
      for (const name of ["t3code", "t3code-v2", "T3 Code (Alpha)", "T3 Code (Dev)"]) {
        yield* fs.makeDirectory(path.join(directory, name), { recursive: true });
        yield* fs.writeFileString(
          path.join(directory, name, "Local State"),
          "upstream credentials",
        );
      }
      const destination = yield* resolveUserDataPath({
        appDataDirectory: directory,
        isDevelopment,
      });
      assert.equal(
        destination,
        path.join(directory, isDevelopment ? "t3codekorean-dev" : "t3codekorean"),
      );
      assert.isFalse(yield* fs.exists(destination));
      assert.equal(
        yield* fs.readFileString(path.join(directory, "t3code-v2", "Local State")),
        "upstream credentials",
      );
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer)),
);
