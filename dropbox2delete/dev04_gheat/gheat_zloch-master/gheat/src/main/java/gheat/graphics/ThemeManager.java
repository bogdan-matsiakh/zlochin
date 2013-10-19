package gheat.graphics;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ThemeManager {

	private ThemeManager() {

	}

	private static Map<String, BufferedImage> dotsList;
	private static Map<String, BufferedImage> colorSchemeList;

	private static final String DOTS_FOLDER = "dots";
	private static final String COLOR_SCHMES_FOLDER = "color-schemes";

	public static void init(String directory) throws IOException {

		dotsList = new HashMap<String, BufferedImage>();
		colorSchemeList = new HashMap<String, BufferedImage>();

		System.out.println(directory);
		System.out.println(DOTS_FOLDER);
		System.out.println(new File(directory, DOTS_FOLDER));

		System.out.println(new File(directory, DOTS_FOLDER).listFiles());
		for (File file : new File(directory, DOTS_FOLDER).listFiles()) {
			if (file.getName().toLowerCase().endsWith(".png")) {
				dotsList.put(file.getName(), ImageIO.read(file));
			}
		}

		for (File file : new File(directory, COLOR_SCHMES_FOLDER).listFiles()) {
			if (file.getName().toLowerCase().endsWith(".png")) {
				colorSchemeList.put(file.getName(), ImageIO.read(file));
			}
		}

	}

	public static BufferedImage GetDot(int zoom) {
		return dotsList.get("dot" + zoom + ".png");
	}

	public static BufferedImage GetColorScheme(String schemeName) throws Exception {
		if (!colorSchemeList.containsKey(schemeName + ".png")) {
			throw new Exception("Color scheme '" + schemeName + " could not be found");
		}
		return colorSchemeList.get(schemeName + ".png");
	}

}
