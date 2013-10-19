package JavaHeatMaps;

import gheat.datasources.DataManager;
import gheat.datasources.FileDataSource;
import gheat.datasources.HeatMapDataSource;
import gheat.datasources.PostGisDataSource;
import gheat.datasources.QuadTreeDataSource;
import gheat.graphics.ThemeManager;

import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;

import org.eclipse.jetty.server.Server;

/**
 * ________ ___ ______________ ________________
 * / _____/ / | \_ _____/ / _ \__ ___/
 * / \ ___ / ~ \ __)_ / /_\ \| |
 * \ \_\ \ \ Y / \/ | \ |
 * \______ / \___|_ /_______ /\____|__ /____|
 * \/ \/ \/ \/
 */
public class App {
	public static DataManager dataManager = null;
	// static URL classpathResource = ClassLoader.getSystemClassLoader().getResource("//");
	static String decodedPath = null;
	static {
		//decodedPath = URLDecoder.decode(ClassLoader.getSystemClassLoader().getResource("//").getPath(), "UTF-8");
		decodedPath = "d:\\Workspaces\\EclipseForJava\\workspace_def\\heatmaps2\\src\\main\\resources\\";
	}

	public static void main(String[] args) throws Exception {
		if (dataManager == null) {
			ThemeManager.init(decodedPath + "res/etc/");
			HeatMapDataSource dataSource = getFileDataSource();
			// HeatMapDataSource dataSource = getQuadTreeDataSource();
			// HeatMapDataSource dataSource = getPostGisDataSource();

			dataManager = new DataManager(dataSource);
			System.out.println("======================================= Initialised =======================================");
		}

		Server server = new Server(5353);
		server.setHandler(new TileHandler());

		server.start();
		server.join();

	}

	/*
	 * Gets PostGIS data source.
	 */
	private static PostGisDataSource getPostGisDataSource() {
		// In this query aliases(longitude,latitude,weight) must remain as shown, the actual table name ,geometry column name and weight
		// column name can change .
		String query = "SELECT ST_X(geom) as longitude," + "ST_Y(geom) as latitude"
				+ "weight as weight from spatialTable where geom @ ST_MakeEnvelope(?,?,?,?,4326)";

		return new PostGisDataSource(query);
	}

	/*
	 * Gets File data source.
	 */
	private static FileDataSource getFileDataSource() {
		return new FileDataSource(decodedPath + "_zlochini.txt", 1, 0, 0);
	}

	/*
	 * Gets quad tree data source. Takes indexes of longitude,latitude and weight columns in the csv file.
	 */
	//private static QuadTreeDataSource getQuadTreeDataSource() {
		//return new QuadTreeDataSource(decodedPath + "points.txt", 2, 1, 0);
	//}
}
