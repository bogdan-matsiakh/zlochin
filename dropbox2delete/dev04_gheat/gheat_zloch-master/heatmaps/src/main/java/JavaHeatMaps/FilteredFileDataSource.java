package JavaHeatMaps;

import gheat.DataPoint;
import gheat.PointLatLng;
import gheat.Projections;
import gheat.datasources.FileDataSource;

public class FilteredFileDataSource extends FileDataSource {

	public FilteredFileDataSource(String filePath, int longitudeIndex,
			int latitudeIndex, int weightIndex) {
		super(filePath, longitudeIndex, latitudeIndex, weightIndex);
	}
	
	@Override
	public PointLatLng[] GetList(DataPoint tlb, DataPoint lrb, int zoom,
			Projections _projection) {
		return super.GetList(tlb, lrb, zoom, _projection);
	}

}
