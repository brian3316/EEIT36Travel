package tw.test.mike.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.test.mike.bean.BlogBean;
import tw.test.mike.bean.CollectBean;

import java.util.List;

public interface CollectRepository extends
        JpaRepository<CollectBean, Integer> {
}
