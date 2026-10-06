package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.repository.LogRepository;
import at.s_sal.tourplaner.repository.TourRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class SearchService {

    private final TourRepository tourRepository;
    private final LogRepository logRepository;



    @Transactional(readOnly = true)
    public RequestResults<?> findToursAndLogsByText(){




        return RequestResults.emptySuccess();
    }


}
